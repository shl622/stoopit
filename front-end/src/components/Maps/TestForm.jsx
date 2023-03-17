import './map.css'
import MapWrapper from '../../containers/MapWrapper'
import SelectionMap from './SelectionMap'
import { useContext, useState } from 'react'
import mapContext from '../../context/map'

export default function TestForm() {
	const [showSelectionMap, setShowSelectionMap] = useState(false)
	const {currentPosition} = useContext(mapContext)

	function handleShowSelectionMap() {
		setShowSelectionMap(true)
	}

	const handleGeoLocation = () => {
		console.log(currentPosition)
	}
	return (
		<div>
			<div>
				<button type="button" onClick={handleGeoLocation}>
					Use Current Location
				</button>
			</div>
			<div>
				<button type="button" onClick={handleShowSelectionMap}>
					{' '}
					Select on Map
				</button>
			</div>
			<div>
				{showSelectionMap && (
					<MapWrapper
						Component={SelectionMap}
						center={currentPosition}
						close={setShowSelectionMap}
					/>
				)}
			</div>
		</div>
	)
}
