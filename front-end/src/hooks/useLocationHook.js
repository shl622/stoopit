import { useEffect, useState } from 'react'

// this is the custom Hook
const useLocationHook = () => {
	const [currentPosition, setCurrentPosition] = useState({})

	useEffect(() => {
		console.log('getting location')
		console.log(currentPosition)
		const getLocation = () => {
			return new Promise((resolve, reject) => {
				if (window.navigator.geolocation) {
					window.navigator.geolocation.getCurrentPosition(
						resolve,
						reject,
						{maximumAge:10000, timeout:5000, enableHighAccuracy:true}
					)
				} else {
					reject('Device does not support location services')
				}
			})
		}

		getLocation()
			.then((pos) => {
				const { latitude, longitude } = pos.coords
				setCurrentPosition({ lat: latitude, lng: longitude })
				console.log(latitude, longitude)
			})
			.catch((err) => {
				console.log(err)
				setCurrentPosition({ lat: 40.7309, lng: -73.9973 })
				alert(err)
			})
		getLocation()
	}, [setCurrentPosition])

	return currentPosition
}

export default useLocationHook
