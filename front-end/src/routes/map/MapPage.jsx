import FullMap from '../../components/Maps/FullMap/FullMap'
import MapWrapper from '../../containers/MapContainer'
const MapPage = ({ currentPosition }) => {
	return (
		<>
			{currentPosition && (
				<MapWrapper Component={FullMap} center={currentPosition} />
			)}
		</>
	)
}

export default MapPage
