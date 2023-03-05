import './BottomNav.css'
import HomeIcon from '../Icons/HomeIcon'
import StoopIcon from '../Icons/StoopIcon'
import MapIcon from '../Icons/MapIcon'

export default function BottomNav() {
	return (
		<div className="btm-nav">
			<button className="btm-nav-icon">
				<HomeIcon />
				<span className="btm-nav-label">Feed</span>
			</button>
			<button className="btm-nav-icon">
				<StoopIcon />
				<span className="btm-nav-label">Upload</span>
			</button>
			<button className="btm-nav-icon">
				<MapIcon />
				<span className="btm-nav-label">Map</span>
			</button>
		</div>
	)
}
