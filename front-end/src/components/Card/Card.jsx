import './Card.css'
import MapIcon from '../Icons/MapIcon'

// return a card with a title, a body and a picture as a component
function Card(props) {
	const { description, title, image } = props
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
					<MapIcon className="card-map-icon" />
				</div>
			</div>
		</>
	)
}

export default Card
