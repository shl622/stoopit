import './App.css'
import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import MapWrapper from './MapContainer'
import FullMap from '../components/Maps/FullMap'

const App = () => {
	const [currentPosition, setCurrentPosition] = useState({})
	const [toggle, setToggle] = useState(false)
	function showTestMap() {
		setToggle(!toggle)
	}
	useEffect(() => {
		themeChange(false)
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
			<button onClick={showTestMap}>Show Stoop Map(Test Purposes)</button>
			{toggle && currentPosition && (
				<MapWrapper Component={FullMap} center={currentPosition} />
			)}
		</div>
	)
}

export default App
