import './TopNav.css'
import { useEffect, useContext } from 'react'
import { calculateDistance } from '../../utils/location'
import mapContext from '../../context/map'
import { useState } from 'react'

const TopNav = ({ stoops, selectedRange, setSelectedRange }) => {
	const { currentPosition } = useContext(mapContext)
	const [stoopsWithinRange, setStoopsWithinRange] = useState(0)

	useEffect(() => {
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
		updateStoopsWithinRange()
	}, [selectedRange, currentPosition, stoops])

	function handleRangeChange(e) {
		setSelectedRange(e.target.value)
	}

	return (
		<nav className="navbar top-nav">
			<div className="stoops-count">
				<p>
					{stoopsWithinRange} Stoop
					{Number(stoopsWithinRange) !== 1 && 's'} Within{' '}
					{selectedRange} Mile{Number(selectedRange) !== 1 && 's'}
				</p>
			</div>
			<div className="slider-container">
				0
				<input
					type="range"
					min="0"
					max="10"
					step="0.5"
					value={selectedRange}
					onChange={handleRangeChange}
					className="range"
				/>
				10
			</div>
		</nav>
	)
}

export default TopNav
