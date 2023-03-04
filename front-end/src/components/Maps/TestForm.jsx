import './map.css'
import MapWrapper from '../../containers/MapContainer'
import SelectionMap from './SelectionMap'
import useLocation from '../../hooks/useLocation'
import { useState } from 'react'

export default function TestForm() {
	const [showSelectionMap, setShowSelectionMap] = useState(false)
	const currentPosition = useLocation()

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
