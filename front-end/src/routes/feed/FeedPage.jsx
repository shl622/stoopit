import { Stoops } from '../../mockdata/db'
import Card from '../../components/Card/Card'

const FeedPage = () => {
	// TODO: Fetch from api
	const stoopsList = Stoops.map((stoop) => {
		return (
			<Card
				key={stoop.id}
				image={stoop.image}
				title={stoop.title}
				date={stoop.date}
				locationName={stoop.locationName}
				description={stoop.description}
			/>
		)
	})

	return <div>{stoopsList}</div>
}

export default FeedPage
