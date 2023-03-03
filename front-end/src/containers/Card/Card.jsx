import React from 'react'
import PropTypes from 'prop-types'

// return a card with a title, a body and a picture as a component
function Card(props) {
	return (
		<div className="card card-compact">
			<figure>
				<img src={props.img} alt="img" />
			</figure>
			<div className="card-body grid grid-cols-2 gap-4">
				<div className="flex-grow">
					<h2 className="card-title">{props.title}</h2>
					<p className="text-left">{props.date}</p>
					<p className="text-left">{props.description}</p>
				</div>
				<div className="card-actions flex justify-end items-center pr-7">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
						/>
					</svg>
				</div>
			</div>
		</div>
	)
}

Card.propTypes = {
	img: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
}

export default Card
