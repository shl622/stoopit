import React from 'react'
import './Card.css'

// return a card with a title, a body and a picture as a component
function Card(props) {
	const { description, title, date, image } = props
	return (
		<>
			<div className="card card-compact card-layout">
				<figure>
					<img className="img" src={image} alt="stoop" />
				</figure>
				<div className="card-body card-text-icon-body">
					<div className="text-stack">
						<h2 className="stoop-title">{title}</h2>
						<p className="stoop-text">{date}</p>
						<p className="stoop-text">{description}</p>
					</div>
					{/* Heroicon: map */}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="card-map-icon"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
						/>
					</svg>
				</div>
			</div>
		</>
	)
}

export default Card
