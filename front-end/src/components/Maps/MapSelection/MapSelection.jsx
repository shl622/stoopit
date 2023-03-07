import { useRef, useEffect, useState } from 'react'
import { initMap } from '../../../utils/map'
import './MapSelection.css'

export default function SelectionMap({ center }) {
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
	}, [center])
	useEffect(() => {
		console.log(selectedLocation)
	}, [selectedLocation])
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
		alert(selectedLocation)
		//For Kai, use this handleConfirm to route out of this map to your form
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
				<button onClick={handleConfirm}>Confirm</button>
			</div>
		</div>
	)
}
