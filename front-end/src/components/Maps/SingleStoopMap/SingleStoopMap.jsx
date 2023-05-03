import '../map.css'
import { useRef, useEffect } from 'react'
import { initMap, renderInitMarkers, renderMarker } from '../../../utils/map'
import { useParams } from 'react-router-dom'

export default function SingleStoopMap() {
	const { id } = useParams()
	const ref = useRef()
	useEffect(() => {
		const setMapStoop = async (id) => {
			try {
				const selectedStoop = (
					await (
						await fetch(
							`${
								process.env.NODE_ENV === 'production'
									? 'https://sea-turtle-app-pvtu7.ondigitalocean.app'
									: 'http://localhost:8080'
							}/api/stoop/?id=${id}`
						)
					).json()
				).data
				const stoops = (
					await (
						await fetch(
							`${
								process.env.NODE_ENV === 'production'
									? 'https://sea-turtle-app-pvtu7.ondigitalocean.app'
									: 'http://localhost:8080'
							}/api/stoops/?lat=${
								selectedStoop.location.lat
							}&lng=${selectedStoop.location.lng}&range=10}`
						)
					).json()
				).data
				const map = initMap({
					stoops,
					ref,
					center: selectedStoop.location
				})
				const filteredStoops = stoops.filter(
					(stoop) => stoop._id !== selectedStoop._id
				)
				renderInitMarkers({ stoops: filteredStoops, map })
				const { marker, infoWindow } = renderMarker({
					stoop: selectedStoop,
					map
				})
				// Open stoop info when single stoop map is opened
				infoWindow.open({
					anchor: marker,
					map
				})
			} catch (err) {
				console.error(err)
			}
		}
		if (id !== undefined) {
			setMapStoop(id)
		}
	}, [id])

	return (
		<div
			className="fullMap"
			ref={ref}
			id="map"
			data-testid="single-stoop-map"
		/>
	)
}
