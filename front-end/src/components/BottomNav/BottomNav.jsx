import './BottomNav.css'
import HomeIcon from '../Icons/HomeIcon'
import CameraIcon from '../Icons/CameraIcon'
import MapIcon from '../Icons/MapIcon'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function BottomNav() {
	const navigate = useNavigate()
	const [disabled, setDisabled] = useState(false)

	const handleUploadClick = (e) => {
		setDisabled(true)
		const input = e.target
		if (!input.files || input.files.length < 1) {
			console.error('Failed to capture image')
			setDisabled(false)
			return
		}

		const imageBlob = input.files[0]
		const imageSrc = URL.createObjectURL(imageBlob)

		navigate('/upload', {
			state: {
				imageSrc
			}
		})
		setDisabled(false)
	}

	return (
		<footer>
			<nav className="btm-nav">
				<button
					type="button"
					className="btm-nav-icon"
					onClick={() => navigate('/feed')}
				>
					<HomeIcon />
					<span className="btm-nav-label">Feed</span>
				</button>
				{/* Label acting as a button so we can use <input> to take a picture */}
				<label htmlFor="upload-input" className="btm-nav-icon">
					<input
						id="upload-input"
						data-testid="upload-input"
						className="hide-input"
						name="camera"
						type="file"
						capture="environment"
						accept="image/*"
						onChange={handleUploadClick}
						disabled={disabled}
					/>
					<CameraIcon />
					<span className="btm-nav-label">Upload</span>
				</label>
				<button
					type="button"
					className="btm-nav-icon"
					onClick={() => navigate('/map')}
				>
					<MapIcon />
					<span className="btm-nav-label">Map</span>
				</button>
			</nav>
		</footer>
	)
}
