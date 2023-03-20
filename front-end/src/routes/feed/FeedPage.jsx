import './FeedPage.css'
import { useState } from 'react'
import { Stoops } from '../../mockdata/db'
import Card from '../../components/Card/Card'
import TopNav from '../../components/TopNav/TopNav'
import { useContext } from 'react'
import mapContext from '../../context/map'
import { calculateDistance } from '../../utils/map'

const FeedPage = () => {
	const { currentPosition } = useContext(mapContext)
	const [selectedRange, setSelectedRange] = useState(1)

	const stoopsList = Stoops.map((stoop) => {
		const distanceToStoop = calculateDistance(
			currentPosition.lat,
			currentPosition.lng,
			stoop.location.lat,
			stoop.location.lng
		)

		// Show card only if it is within selectedRange
		return distanceToStoop <= selectedRange ? (
			<Card
				key={stoop.id}
				id={stoop.id}
				image={stoop.image}
				title={stoop.title}
				date={stoop.date}
				lat={stoop.location.lat}
				lng={stoop.location.lng}
				description={stoop.description}
			/>
		) : (
			<></>
		)
	})

	return (
		<>
			<TopNav
				currentPosition={currentPosition}
				stoops={Stoops}
				selectedRange={selectedRange}
				setSelectedRange={setSelectedRange}
			/>
			<div className="feed">{stoopsList}</div>
		</>
	)
}

export default FeedPage
