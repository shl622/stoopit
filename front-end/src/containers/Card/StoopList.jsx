import React from 'react'
import './StoopList.css'
import { Stoops } from '../../mockdata/db'
import Card from './Card'

function StoopList() {
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

export default StoopList
