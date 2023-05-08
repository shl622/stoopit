import './Card.css'
import MapIcon from '../Icons/MapIcon'
import { useNavigate } from 'react-router-dom'
import { calculateDistance } from '../../utils/location'
import { DateTime } from 'luxon'

// return a card with a title, a body and a picture as a component
function Card(props) {
	const {
		id,
		description,
		title,
		image,
		lat,
		lng,
		timestamp,
		distanceToStoop,
		currentPosition
	} = props

	const navigate = useNavigate()

	const distance =
		distanceToStoop !== null
			? distanceToStoop
			: calculateDistance(
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
					<img className="img" src={image} alt="stoop" />
				</figure>
				<div className="card-body card-body-layout">
					<div className="text-stack">
						<h2 className="card-title">
							{title}
							<span id="timestamp">
								{DateTime.fromISO(timestamp)
									.toLocal()
									.toRelative()}
							</span>
						</h2>
						<p className="stoop-text">{description}</p>
					</div>
					<div className="card-actions justify-end">
						<div className="text-stack">
							<div>
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
				</div>
			</div>
		</>
	)
}

export default Card
