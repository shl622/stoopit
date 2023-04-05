import EXIF from 'exif-js'

export function initMap({ stoops, ref, center }) {
	const map = new window.google.maps.Map(ref.current, {
		center,
		zoom: 18,
		disableDefaultUI: true,
		styles: [
			{
				featureType: 'poi',
				elementType: 'labels',
				stylers: [{ visibility: 'off' }]
			}
		]
	})
	return map
}

export function renderMarker({ stoop, map }) {
	const infoWindow = new window.google.maps.InfoWindow({
		content: formatInfoWindow(stoop)
	})
	const marker = new window.google.maps.Marker({
		position: stoop.location,
		map,
		title: stoop.title
	})
	marker.addListener('click', () => {
		infoWindow.open({
			anchor: marker,
			map
		})
	})
	window.google.maps.event.addListener(map, 'click', function (event) {
		infoWindow.close()
	})
	return { marker, infoWindow }
}

export function renderInitMarkers({ stoops, map }) {
	stoops.map((stoop) => {
		return renderMarker({ stoop, map })
	})
}

export function formatInfoWindow(stoop) {
	const title = stoop.title
	const content = stoop.description
	return `
        <div class="infowindow" id="content-${stoop.id}">
            <div>
                <h3 class="infowindow-title">${title}</h3>
            </div>
            <div class="infowindow-image">
                <img src="${stoop.image}">
            </div>
            <div>
                <p class="infowindow-description">${content}<p>
            </div>
        </div>
    `
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
	const R = 3958.8 // Earth's radius in miles
	const dLat = (lat2 - lat1) * (Math.PI / 180)
	const dLon = (lon2 - lon1) * (Math.PI / 180)
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * (Math.PI / 180)) *
			Math.cos(lat2 * (Math.PI / 180)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const distance = R * c
	return distance
}

export function getLocationFromExifData(photoFile) {
	return new Promise((resolve, reject) => {
		EXIF.getData(photoFile, function () {
			const latRef = EXIF.getTag(this, 'GPSLatitudeRef')
			const lat = EXIF.getTag(this, 'GPSLatitude')
			const lngRef = EXIF.getTag(this, 'GPSLongitudeRef')
			const lng = EXIF.getTag(this, 'GPSLongitude')

			if (!lat || !lng) {
				reject(
					new Error(
						'Could not extract location data from photo EXIF.'
					)
				)
			}

			const latDecimal =
				(lat[0] + lat[1] / 60 + lat[2] / 3600) *
				(latRef === 'N' ? 1 : -1)
			const lngDecimal =
				(lng[0] + lng[1] / 60 + lng[2] / 3600) *
				(lngRef === 'E' ? 1 : -1)

			const location = { lat: latDecimal, lng: lngDecimal }
			resolve(location)
		})
	})
}
