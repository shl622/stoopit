import './App.css'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocationHook } from '../../hooks/useLocationHook'
import MapPage from '../../routes/map/MapPage'
import FeedPage from '../../routes/feed/FeedPage'
import BottomNav from '../../components/BottomNav/BottomNav'
import UploadPage from '../../routes/upload/UploadPage'
<<<<<<< HEAD
import SingleStoopMap from '../../components/Maps/SingleStoopMap/SingleStoopMap'
=======
import { MapProvider } from '../../context/map'
>>>>>>> master
// import SubmitForm from '../../components/SubmitForm/SubmitForm'

const App = () => {
	const { lat, lng, setPosition, error } = useLocationHook()
	const currentPosition = { lat, lng }
	useEffect(() => {
		themeChange(false)
	}, [])

	return (
<<<<<<< HEAD
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
					<Route path="/map/:id" element={<SingleStoopMap />} />
				</Routes>
			</main>
			<BottomNav />
		</div>
=======
		<MapProvider
			value={{
				currentPosition,
				setPosition,
				error
			}}
		>
			<div className="app">
				<main>
					<Routes>
						<Route
							path="/"
							element={<Navigate to="/feed" replace />}
						/>
						<Route path="/feed" element={<FeedPage />} />
						<Route path="/upload" element={<UploadPage />} />
						<Route
							path="/map"
							element={
								<MapPage currentPosition={currentPosition} />
							}
						/>
					</Routes>
				</main>
				<BottomNav />
			</div>
		</MapProvider>
>>>>>>> master
	)
}

export default App
