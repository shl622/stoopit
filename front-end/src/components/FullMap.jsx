import { useRef, useEffect, useState } from 'react'
import { Stoops } from '../mockdata/db'
import { initMap, renderInitMarkers } from '../utils/map'

//mock function for getting mockdata
//remove later when actual DB is set up
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
				console.log(err)
			}
		}
		getStoops()
	}, [])

	useEffect(() => {
		console.log(stoops)
		const map = initMap({ stoops, ref, center })
		renderInitMarkers({ stoops, map })
	}, [center, stoops])
	return <div className="fullMap" ref={ref} id="map" />
}
