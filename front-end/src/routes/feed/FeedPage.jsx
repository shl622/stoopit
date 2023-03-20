import { Stoops } from '../../mockdata/db'
import Card from '../../components/Card/Card'
import TopNav from '../../components/TopNav/TopNav'
const FeedPage = () => {
	// TODO: Fetch from api
	const currentPosition = {
		lat: 40.7128,
		lng: -74.006
	}

	const stoopsList = Stoops.map((stoop) => {
		return (
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
		)
	})

	return (
		<>
			<TopNav currentPosition={currentPosition} stoops={Stoops} />

			<div>{stoopsList}</div>
		</>
	)
}

export default FeedPage
