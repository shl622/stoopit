import './App.css'
import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLocationHook } from '../../hooks/useLocationHook'
import MapPage from '../../routes/map/MapPage'
import FeedPage from '../../routes/feed/FeedPage'
import BottomNav from '../../components/BottomNav/BottomNav'
import UploadPage from '../../routes/upload/UploadPage'
import StoopMapPage from '../../routes/map/[id]/StoopMapPage'
import Toast from '../../components/Toast/Toast'
import { MapProvider } from '../../context/map'
import { StoopProvider } from '../../context/stoop'

const App = () => {
	const { lat, lng, setPosition, error } = useLocationHook()
	const currentPosition = { lat, lng }
	const [stoops, setStoops] = useState([])
	const [selectedRange, setSelectedRange] = useState(1)
	useEffect(() => {
		themeChange(false)
	}, [])

	return (
		<MapProvider
			value={{
				currentPosition,
				setPosition,
				error
			}}
		>
			<StoopProvider
				value={{
					stoops,
					setStoops
				}}
			>
				<div className="app">
					<Toast
						show={error}
						toastMessage="Please Allow Location Services"
					/>
					<main>
						<Routes>
							<Route
								path="/"
								element={<Navigate to="/feed" replace />}
							/>
							<Route
								path="/feed"
								element={
									<FeedPage
										selectedRange={selectedRange}
										setSelectedRange={setSelectedRange}
									/>
								}
							/>
							<Route path="/upload" element={<UploadPage />} />
							<Route
								path="/map"
								element={
									<MapPage
										currentPosition={currentPosition}
										stoops={stoops}
									/>
								}
							/>
							<Route path="/map/:id" element={<StoopMapPage />} />
						</Routes>
					</main>
					<BottomNav />
				</div>
			</StoopProvider>
		</MapProvider>
	)
}

export default App
