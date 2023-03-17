// this is the custom Hook

import { useState, useEffect } from 'react'

export const useLocationHook = () => {
	const [position, setPosition] = useState({})
	const [error, setError] = useState(null)

	const onChange = ({ coords }) => {
		setPosition({
			lat: coords.latitude,
			lng: coords.longitude
		})
	}
	const onError = (error) => {
		setError(error.message)
		//if error set default location to wsp
		setPosition({ lat: 40.7309, lng: -73.9973 })
	}
	useEffect(() => {
		const geo = navigator.geolocation
		if (!geo) {
			setError('Geolocation is not supported')
			return
		}
		geo.getCurrentPosition(onChange, onError)
		const watcher = geo.watchPosition(onChange, onError)
		return () => geo.clearWatch(watcher)
	}, [])
	return { ...position, setPosition, error }
}
