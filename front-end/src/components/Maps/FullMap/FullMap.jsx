import '../map.css'
import { useRef, useEffect } from 'react'
import { initMap, renderInitMarkers } from '../../../utils/map'

export default function FullMap({ center, stoops }) {
	const ref = useRef()

	useEffect(() => {
		const map = initMap({ stoops, ref, center })
		renderInitMarkers({ stoops, map })
	}, [center, stoops])
	return <div className="fullMap" ref={ref} id="map" data-testid="full-map" />
}
