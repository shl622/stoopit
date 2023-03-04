import './App.css'
import { useEffect, useState } from 'react'
import { themeChange } from 'theme-change'
import useLocation from '../hooks/useLocation'
import SubmitForm from '../components/SubmitForm/SubmitForm'
import MapWrapper from './MapContainer'
import FullMap from '../components/Maps/FullMap'

const App = () => {
	const [toggle, setToggle] = useState(false)
	const currentPosition = useLocation()
	function showTestMap() {
		setToggle(!toggle)
	}
	useEffect(() => {
		themeChange(false)
	}, [])

	return (
		<div className="App">
			<button onClick={showTestMap}>Show Stoop Map(Test Purposes)</button>
			{toggle && currentPosition && (
				<MapWrapper Component={FullMap} center={currentPosition} />
			)}
			<SubmitForm />
		</div>
	)
}

export default App
