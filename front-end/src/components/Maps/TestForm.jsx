import './map.css'
import MapWrapper from '../../containers/MapWrapper'
import SelectionMap from './SelectionMap'
import { useEffect, useState } from 'react'

export default function TestForm() {
	const [showSelectionMap, setShowSelectionMap] = useState(false)
	const [currentPosition, setCurrentPosition] = useState({})
	useEffect(() => {
		handleGeoLocation()
	}, [])
	function handleShowSelectionMap() {
		setShowSelectionMap(true)
	}
	const handleGeoLocation = () => {
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
		console.log(currentPosition)
	}
	return (
		<div>
			<div>
				<button onClick={handleGeoLocation}>
					Use Current Location
				</button>
			</div>
			<div>
				<button onClick={handleShowSelectionMap}> Select on Map</button>
			</div>
			<div>
				{showSelectionMap && (
					<MapWrapper
						Component={SelectionMap}
						center={currentPosition}
						close={setShowSelectionMap}
					/>
				)}
			</div>
		</div>
	)
}
