import './App.css'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocationHook } from '../../hooks/useLocationHook'
import MapPage from '../../routes/map/MapPage'
import FeedPage from '../../routes/feed/FeedPage'
import BottomNav from '../../components/BottomNav/BottomNav'
import UploadPage from '../../routes/upload/UploadPage'
// import SubmitForm from '../../components/SubmitForm/SubmitForm'

const App = () => {
	const currentPosition = useLocationHook()

	useEffect(() => {
		themeChange(false)
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
