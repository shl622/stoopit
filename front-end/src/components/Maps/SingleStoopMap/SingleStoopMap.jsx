import '../map.css'
import { useRef, useEffect, useState } from 'react'
import { Stoops } from '../../../mockdata/db'
import { initMap, renderMarker } from '../../../utils/map'

const mockGetStoop = async (id = '1345912') => {
	return new Promise((resolve, reject) => {
		resolve(
			Stoops.find((stoop) => {
				return stoop.id === id
			})
		)
	})
}

export default function SingleStoopMap() {
	const ref = useRef()
	const [stoop, setStoop] = useState({})
	useEffect(() => {
		const getStoop = async () => {
			try {
				const stoop = await mockGetStoop()
				setStoop(stoop)
			} catch (err) {
				console.error(err)
			}
		}
		getStoop()
	}, [])

	useEffect(() => {
		const map = initMap({ stoop, ref, center: stoop.location })
		renderMarker({ stoop, map })
	}, [stoop])
	return (
		<div
			className="fullMap"
			ref={ref}
			id="map"
			data-testid="single-stoop-map"
		/>
	)
}
