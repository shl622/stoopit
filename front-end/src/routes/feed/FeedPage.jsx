import './FeedPage.css'
import { useEffect } from 'react'
import Card from '../../components/Card/Card'
import { useContext } from 'react'
import mapContext from '../../context/map'
import { calculateDistance } from '../../utils/location'
import { useState } from 'react'
import Spinner from '../../components/SpinnerLoader/SpinnerLoader'
import stoopContext from '../../context/stoop'
import { DateTime } from 'luxon'

const FeedPage = ({ selectedRange, setSelectedRange }) => {
	const { currentPosition } = useContext(mapContext)
	const { stoops, setStoops } = useContext(stoopContext)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (currentPosition.lat && currentPosition.lng) {
			fetch(
				`${
					process.env.NODE_ENV === 'production'
						? 'https://sea-turtle-app-pvtu7.ondigitalocean.app'
						: 'http://localhost:8080'
				}/api/stoops?lat=${currentPosition.lat}&lng=${
					currentPosition.lng
				}&range=${selectedRange}`
			)
				.then((res) => res.json())
				.then((res) => {
					function sortbytime(a, b) {
						const aDate = DateTime.fromISO(a.createdAt)
						const bDate = DateTime.fromISO(b.createdAt)

						if (aDate > bDate) {
							return -1
						} else if (aDate < bDate) {
							return 1
						} else {
							return 0
						}
					}
					res.data.sort(sortbytime)
					setStoops(res.data)
					setLoading(false)
				})
		}
	}, [selectedRange, currentPosition.lat, currentPosition.lng, setStoops])

	return (
		<>
			<div className="feed">
				{loading && <Spinner />}
				{stoops.length === 0 && (
					<div key="notFound">
						No stoops found, please expand your range
					</div>
				)}
				{stoops &&
					stoops.map((stoop, index) => {
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
								key={stoop._id}
								id={stoop._id}
								image={stoop.image}
								title={stoop.title}
								timestamp={stoop.createdAt}
								lat={stoop.location.lat}
								lng={stoop.location.lng}
								description={stoop.description}
							/>
						) : (
							<div key={stoop._id}></div>
						)
					})}
			</div>
		</>
	)
}

export default FeedPage
