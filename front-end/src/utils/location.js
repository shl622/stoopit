import EXIF from 'exif-js'

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
		let location = null

		EXIF.getData(photoFile, function () {
			const latRef = EXIF.getTag(this, 'GPSLatitudeRef')
			const lat = EXIF.getTag(this, 'GPSLatitude')
			const lngRef = EXIF.getTag(this, 'GPSLongitudeRef')
			const lng = EXIF.getTag(this, 'GPSLongitude')

			if (!latRef || !lat || !lngRef || !lng) return null

			const latDecimal =
				(lat[0] + lat[1] / 60 + lat[2] / 3600) *
				(latRef === 'N' ? 1 : -1)
			const lngDecimal =
				(lng[0] + lng[1] / 60 + lng[2] / 3600) *
				(lngRef === 'E' ? 1 : -1)

			location = { lat: latDecimal, lng: lngDecimal }
			resolve(location)
		})
	})
}

export async function translateCoordToAddress(location) {
	const geocoder = new window.google.maps.Geocoder()
	const latlng = new window.google.maps.LatLng(location.lat, location.lng)
	try {
		const translated = await geocoder.geocode({
			location: latlng
		})
		if (!translated.results || !translated.results[0]) {
			return `Could not find address: coordinates are ${location.lat}, ${location.lng}`
		}
		return translated.results[0].formatted_address
	} catch (err) {
		console.log(err)
		return `Could not find address: coordinates are ${location.lat}, ${location.lng}`
	}
}
