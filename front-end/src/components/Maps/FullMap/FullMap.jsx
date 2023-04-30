import '../map.css'
import { initMap, renderInitMarkers } from '../../../utils/map'
import { useContext } from 'react'
import mapContext from '../../../context/map'
import stoopContext from '../../../context/stoop'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'

export default function FullMap({
	center,
	stoops,
	selectedRange,
	setSelectedRange
}) {
	const ref = useRef()
	const { currentPosition } = useContext(mapContext)
	const { setStoops } = useContext(stoopContext)
	const [setLoading] = useState(true)

	useEffect(() => {
		const map = initMap({ stoops, ref, center })
		renderInitMarkers({ stoops, map })
	}, [center, stoops])

	useEffect(() => {
		if (currentPosition.lat && currentPosition.lng) {
			fetch(
				`http://localhost:8080/api/stoops?lat=${currentPosition.lat}&lng=${currentPosition.lng}&range=${selectedRange}`
			)
				.then((res) => res.json())
				.then((res) => {
					function sortbytime(a, b) {
						if (a.timestamp > b.timestamp) {
							return -1
						} else if (a.timestamp < b.timestamp) {
							return 1
						} else {
							return 0
						}
					}
					res.data.sort(sortbytime)
					setStoops(res.data)
					setLoading(false)
				})
		}
	}, [
		selectedRange,
		currentPosition.lat,
		currentPosition.lng,
		setStoops,
		setLoading
	])

	return (
		<>
			<div className="fullMapContainer">
				<div
					className="fullMap"
					ref={ref}
					id="map"
					data-testid="full-map"
				/>
			</div>
		</>
	)
}
