import './App.css'
import { useEffect, useState } from 'react'
// import { themeChange } from 'theme-change'
import MapWrapper from '../components/MapWrapper'
import FullMap from '../components/FullMap'
// import SingleStoopMap from '../components/SingleStoopMap'
// import TestForm from '../components/TestForm'

const App = () => {
	const [currentPosition, setCurrentPosition] = useState({})
	useEffect(() => {
		function success(pos) {
			setCurrentPosition({
				lat: pos.coords.latitude,
				lng: pos.coords.longitude
			})
		}
		function error(err) {
			setCurrentPosition({ lat: 40.7309, lng: -73.9973 })
		}
		function getLocation() {
			if (window.navigator.geolocation) {
				window.navigator.geolocation.getCurrentPosition(success, error)
			} else {
				alert('Device does not support location services')
				error()
			}
		}
		getLocation()
	}, [])

	return (
		<div className="App">
			{/* Format: center={{lat: , lng: }} */}
			{/* For when user wants to view full map- use geolocation */}
			{currentPosition &&
				<MapWrapper Component={FullMap} center={currentPosition}/>
			}
			{/* <TestForm /> */}
			{/* For when user wants to view specific stoop location*/}
			{/* <MapWrapper Component={SingleStoopMap} /> */}
			{}
		</div>
	)
}

export default App
