import './FeedPage.css'
import { useEffect } from 'react'
import Card from '../../components/Card/Card'
import TopNav from '../../components/TopNav/TopNav'
import { useContext } from 'react'
import mapContext from '../../context/map'
import { calculateDistance } from '../../utils/map'
import { useState } from 'react'
import Spinner from '../../components/SpinnerLoader/SpinnerLoader'

const FeedPage = ({ stoops, setStoops, selectedRange, setSelectedRange }) => {
	const { currentPosition } = useContext(mapContext)
	const [loading, setLoading] = useState(true)

	/**
	 *  @typedef Stoop
	 *  @property {number} id
	 *	@property {{ lat: number, lng: number }} location
	 *	@property {string} title,
	 *	@property {number} timestamp UNIX Timestamp
	 *	@property {string} image
	 *	@property {string} description
	 */

	useEffect(() => {
		if (currentPosition.lat && currentPosition.lng) {
			fetch(
				`http://localhost:8080/api/stoops?lat=${currentPosition.lat}&lng=${currentPosition.lng}&range=${selectedRange}`
			)
				.then((res) => res.json())
				.then((res) => {
					function sortbytime(a, b) {
						return a.timestamp > b.timestamp
							? -1
							: a.timestamp < b.timestamp
								? 1
								: 0
					}
					res.data.sort(sortbytime)
					setStoops(res.data)
					setLoading(false)
				})
		}
	}, [selectedRange, currentPosition.lat, currentPosition.lng])

	return (
		<>
			<TopNav
				currentPosition={currentPosition}
				stoops={stoops}
				selectedRange={selectedRange}
				setSelectedRange={setSelectedRange}
			/>
			<div className="feed">
				{loading && <Spinner />}
				{stoops.length === 0 && <>No stoops found, please expand your range</>}
				{stoops &&
					stoops.map((/** @type {Stoop} */ stoop) => {
						const distanceToStoop = calculateDistance(
							currentPosition.lat,
							currentPosition.lng,
							stoop.location.lat,
							stoop.location.lng
						)

						// Show card only if it is within selectedRange
						return distanceToStoop <= selectedRange ? (
							<Card
								distanceToStoop={distanceToStoop}
								key={stoop.id}
								id={stoop.id}
								image={stoop.image}
								title={stoop.title}
								timestamp={stoop.timestamp}
								lat={stoop.location.lat}
								lng={stoop.location.lng}
								description={stoop.description}
							/>
						) : (
							<></>
						)
					})}
			</div>
		</>
	)
}

export default FeedPage
