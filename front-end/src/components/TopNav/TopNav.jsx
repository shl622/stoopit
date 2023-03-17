import React, { useState, useEffect } from 'react'
import './TopNav.css'

const TopNav = ({ currentPosition, stoops }) => {
	const [selectedRange, setSelectedRange] = useState(2)
	const [stoopsWithinRange, setStoopsWithinRange] = useState(0)

	function calculateDistance(lat1, lon1, lat2, lon2) {
		const R = 3958.8 // Earth's radius in miles
		const dLat = (lat2 - lat1) * (Math.PI / 180)
		const dLon = (lon2 - lon1) * (Math.PI / 180)
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1 * (Math.PI / 180)) *
				Math.cos(lat2 * (Math.PI / 180)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2)
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
		const distance = R * c
		return distance
	}

	function updateStoopsWithinRange() {
		let count = 0
		stoops.forEach((stoop) => {
			const distance = calculateDistance(
				currentPosition.lat,
				currentPosition.lng,
				stoop.location.lat,
				stoop.location.lng
			)
			if (distance <= selectedRange) {
				count++
			}
		})
		setStoopsWithinRange(count)
	}

	useEffect(() => {
		updateStoopsWithinRange()
	}, [selectedRange])

	return (
		<nav className="top-nav">
			<div className="stoops-count">
				<p>
					{stoopsWithinRange} stoops within {selectedRange} miles
				</p>
			</div>
			<div className="range-container">
				<button onClick={() => setSelectedRange(2)}>
					Change Range
				</button>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
					/>
				</svg>
			</div>
		</nav>
	)
}

export default TopNav
