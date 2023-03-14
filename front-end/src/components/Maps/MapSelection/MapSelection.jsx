import { useRef, useEffect, useState } from 'react'
import { initMap } from '../../../utils/map'
import './MapSelection.css'

export default function SelectionMap({ center, setMapLocation }) {
	const ref = useRef()
	const [showpopup, setShowPopUp] = useState(true)
	const [selectedLocation, setSelectedLocation] = useState({
		lat: null,
		lng: null
	})
	const [confirmMsg, setConfirmMsg] = useState(false)
	useEffect(() => {
		const mapInitial = initMap({ ref, center })
		placeMarker(mapInitial)
	}, [])
	function handleDragStart(event) {
		setShowPopUp(false)
	}
	function handleDragEnd(event) {
		setSelectedLocation({
			lat: event.latLng.lat(),
			lng: event.latLng.lng()
		})
		setConfirmMsg(true)
	}
	function placeMarker(map) {
		const marker = new window.google.maps.Marker({
			map,
			draggable: true,
			position: center
		})
		marker.addListener('drag', handleDragStart)
		marker.addListener('dragend', handleDragEnd)
	}
	function handleConfirm() {
		setMapLocation(selectedLocation)
	}
	return (
		<div>
			<div className="fullMap" ref={ref} id="map" />
			<div
				className={`instructionPopUp ${
					showpopup
						? 'instructionPopUpEnter'
						: 'instructionPopUpLeave'
				}`}
			>
				<p>Please move the marker to your desired location.</p>
			</div>
			<div
				className={`instructionPopUp instructionPopUpHidden ${
					confirmMsg && 'confirmMsgPopUpEnter'
				}`}
			>
				<p>Selected</p>
				<button type="button" onClick={handleConfirm}>
					Confirm
				</button>
			</div>
		</div>
	)
}
