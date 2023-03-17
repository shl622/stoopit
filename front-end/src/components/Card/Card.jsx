import './Card.css'
import MapIcon from '../Icons/MapIcon'
import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

// return a card with a title, a body and a picture as a component
function Card(props) {
	const { id, description, title, image } = props
	const navigate = useNavigate()

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
					<button
						className="map-button"
						onClick={() => navigate(`/map/${id}`)}
					>
						<MapIcon className="card-map-icon" />
					</button>
				</div>
			</div>
		</>
	)
}

export default Card
