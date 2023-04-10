import '../map.css'
import { useRef, useEffect } from 'react'
import { initMap, renderMarker } from '../../../utils/map'
import { useParams } from 'react-router-dom'

export default function SingleStoopMap() {
	const { id } = useParams()
	const ref = useRef()
	useEffect(() => {
		const setMapStoop = async (id) => {
			try {
				const stoop = (
					await (
						await fetch('http://localhost:8080/api/stoop?id=' + id)
					).json()
				).data
				const map = initMap({ stoop, ref, center: stoop.location })
				const { marker, infoWindow } = renderMarker({ stoop, map })
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
