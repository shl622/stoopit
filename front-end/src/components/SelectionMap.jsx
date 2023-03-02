// import { useRef, useEffect, useState } from 'react'
// import { initMap } from '../utils/map'

// export default function SelectionMap({ center }) {
// 	const ref = useRef()
// 	const [map, setMap] = useState(null)
// 	const [selectedLocation, setSelectedLocation] = useState(null)
// 	const timer = useRef()
// 	useEffect(() => {
// 		const map = initMap({ ref, center })
// 		setMap(map)
// 		window.google.maps.event.addListener(map, 'click', function (event) {
// 			detectDoubleClick(map, event)
// 		})
// 	}, [center])
// 	useEffect(() => {
// 		console.log('selected Location', selectedLocation)
// 		placeMarker(map, selectedLocation)
// 	}, [selectedLocation])
// 	function placeMarker(map, location) {
// 		console.log(map, location)
// 		if (selectedLocation) {
// 			return
// 		} else {
// 			//  const newMarker = new window.google.maps.Marker({
// 			//  position: location,
// 			//  map: map
// 			//  })
// 		}
// 	}
// 	function detectDoubleClick(map, event) {
// 		if (timer.current) {
// 			// placeMarker(map,event.latLng)
// 			setSelectedLocation(event.latLng)
// 			clearTimeout(timer.current)
// 			timer.current = null
// 		} else {
// 			timer.current = setTimeout(() => {
// 				clearTimeout(timer.current)
// 			}, 600)
// 		}
// 	}
// 	return <div className="fullMap" ref={ref} id="map" />
// }
