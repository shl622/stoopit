import './App.css'
import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import { Routes, Route, Navigate } from 'react-router-dom'
import MapPage from '../../routes/map/MapPage'
import FeedPage from '../../routes/feed/FeedPage'
import BottomNav from '../../components/BottomNav/BottomNav'
import UploadPage from '../../routes/upload/UploadPage'

const App = () => {
	const [currentPosition, setCurrentPosition] = useState({})
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
				console.error('Device does not support location services')
				error()
			}
		}
		getLocation()
	}, [])

	return (
		<div className="app">
			<main>
				<Routes>
					<Route path="/" element={<Navigate to="/feed" replace />} />
					<Route path="/feed" element={<FeedPage />} />
					<Route path="/upload" element={<UploadPage />} />
					<Route
						path="/map"
						element={<MapPage currentPosition={currentPosition} />}
					/>
				</Routes>
			</main>
			<BottomNav />
		</div>
	)
}

export default App
