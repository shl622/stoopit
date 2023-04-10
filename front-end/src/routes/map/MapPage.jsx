import FullMap from '../../components/Maps/FullMap/FullMap'
import MapWrapper from '../../containers/MapWrapper'
const MapPage = ({ currentPosition, stoops }) => {
	return (
		<>
			{currentPosition && (
				<MapWrapper
					Component={FullMap}
					center={currentPosition}
					stoops={stoops}
				/>
			)}
		</>
	)
}

export default MapPage
