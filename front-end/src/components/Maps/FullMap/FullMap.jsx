import '../map.css'
import { useRef, useEffect, useState } from 'react'
import { Stoops } from '../../../mockdata/db'
import { initMap, renderInitMarkers } from '../../../utils/map'

const mockGetStoops = async () => {
	return new Promise((resolve, reject) => {
		resolve(Stoops)
	})
}

export default function FullMap({ center }) {
	const ref = useRef()
	const [stoops, setStoops] = useState([])

	useEffect(() => {
		const getStoops = async () => {
			try {
				const stoops = await mockGetStoops()
				setStoops(stoops)
			} catch (err) {
				console.error(err)
			}
		}
		getStoops()
	}, [])

	useEffect(() => {
		const map = initMap({ stoops, ref, center })
		renderInitMarkers({ stoops, map })
	}, [center, stoops])
	return <div className="fullMap" ref={ref} id="map" data-testid="full-map" />
}
