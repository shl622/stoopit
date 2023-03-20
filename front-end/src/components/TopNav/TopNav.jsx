import React, { useState, useEffect } from 'react'
import './TopNav.css'
import { calculateDistance } from '../../utils/map'

const TopNav = ({ currentPosition, stoops }) => {
	const [selectedRange, setSelectedRange] = useState(2)
	const [stoopsWithinRange, setStoopsWithinRange] = useState(0)

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
		<nav className="top-nav flex">
			<div className="stoops-count">
				<p>
					{stoopsWithinRange} stoops within {selectedRange} miles
				</p>
			</div>
			<div className="slider-container">
				<input
					type="range"
					min="0"
					max="10"
					step="0.5"
					value={selectedRange}
					onChange={handleRangeChange}
					className="range"
				/>
			</div>
		</nav>
	)
}

export default TopNav

