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

	function handleRangeChange(e) {
		setSelectedRange(e.target.value)
	}

	return (
		<nav className="top-nav">
			<div className="stoops-count">
				<p>
					{stoopsWithinRange} stoops within{' '}
					<input
						type="number"
						value={selectedRange}
						min="0"
						onChange={handleRangeChange}
						style={{ width: '50px' }}
					/>{' '}
					miles
				</p>
			</div>
		</nav>
	)
}

export default TopNav
