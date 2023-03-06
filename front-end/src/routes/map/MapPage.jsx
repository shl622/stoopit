import FullMap from '../../components/Maps/FullMap/FullMap'
import MapWrapper from '../../containers/MapWrapper'
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
