import MapSelection from '../../components/Maps/MapSelection/MapSelection'
import MapWrapper from '../../containers/MapWrapper'
const MapPage = ({ currentPosition }) => {
	return (
		<>
			{currentPosition && (
				<MapWrapper Component={MapSelection} center={currentPosition} />
			)}
		</>
	)
}

export default MapPage
