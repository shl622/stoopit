import './Card.css'
import MapIcon from '../Icons/MapIcon'
import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

// return a card with a title, a body and a picture as a component
function Card(props) {
	const { id, description, title, image, lat, lng } = props
	const navigate = useNavigate()
	const currentPosition = {
		lat: 40.7128,
		lng: -74.006
	}
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

	// calculate distance between current position and stoop location
	const distance = calculateDistance(
		lat,
		lng,
		currentPosition.lat,
		currentPosition.lng
	)

	return (
		<>
			<div className="card card-compact card-layout">
				<figure>
					<img className="img" src={image} alt="stoop" />
				</figure>
				<div className="card-body card-text-icon-body">
					<div className="text-stack">
						<h2 className="stoop-title">{title}</h2>

						<p className="stoop-text">{description}</p>
					</div>
					<div className="map-button">
						<button onClick={() => navigate(`/map/${id}`)}>
							<MapIcon className="card-map-icon" />
						</button>
						<p className="distance">
							{' '}
							{distance.toFixed(2)} miles{' '}
						</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Card
