import FullMap from '../../components/Maps/FullMap/FullMap'
import MapWrapper from '../../containers/MapWrapper'

const MapPage = ({
	selectedRange,
	setSelectedRange,
	currentPosition,
	stoops
}) => {
	return (
		<>
			{currentPosition && (
				<MapWrapper
					Component={FullMap}
					selectedRange={selectedRange}
					setSelectedRange={setSelectedRange}
					center={currentPosition}
					stoops={stoops}
				/>
			)}
		</>
	)
}

export default MapPage
