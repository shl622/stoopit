import '../map.css'
import { initMap, renderInitMarkers } from '../../../utils/map'
import TopNav from '../../../components/TopNav/TopNav'
import React, { useRef, useEffect } from 'react'

export default function FullMap({
	selectedRange,
	setSelectedRange,
	center,
	stoops
}) {
	const ref = useRef()

	useEffect(() => {
		const map = initMap({ stoops, ref, center })
		renderInitMarkers({ stoops, map })
	}, [center, stoops, selectedRange])

	return (
		<>
			<TopNav
				stoops={stoops}
				selectedRange={selectedRange}
				setSelectedRange={setSelectedRange}
			/>
			<div
				className="fullMap"
				ref={ref}
				id="map"
				data-testid="full-map"
			/>
		</>
	)
}
