import './Card.css'
import MapIcon from '../Icons/MapIcon'
import { useNavigate } from 'react-router-dom'
import { calculateDistance } from '../../utils/map'

// return a card with a title, a body and a picture as a component
function Card(props) {
	const { id, description, title, image, lat, lng } = props
	const navigate = useNavigate()
	const currentPosition = {
		lat: 40.7128,
		lng: -74.006
	}

	// calculate distance between current position and stoop location
	const distance = calculateDistance(
		lat,
		lng,
		currentPosition.lat,
		currentPosition.lng
	)

	// return a card with a title, a body and a picture
	return (
		<>
			<div className="card card-compact card-layout">
				<figure>
					<img src={image} alt="stoop" />
				</figure>
				<div className="card-body card-body-layout">
					<div className="text-stack">
						<h2 className="card-title">{title}</h2>

						<p className="stoop-text">{description}</p>
					</div>
					<div className="card-actions justify-end">
						<button
							className="map-button"
							onClick={() => navigate(`/map/${id}`)}
						>
							<MapIcon className="card-map-icon" />
							<p className="distance">
								{distance.toFixed(2)} miles
							</p>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Card
