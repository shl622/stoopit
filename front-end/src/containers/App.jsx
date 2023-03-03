import logo from './logo.svg'
import './App.css'

import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import SubmitForm from '../SubmitForm/SubmitForm'

const App = () => {
	// for use with themechange plugin – recommended by daisyui if we are using themes.
	useEffect(() => {
		themeChange(false)
		// 👆 false parameter is required for react project
	}, [])

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
			</header>
			<SubmitForm />
		</div>
	)
}

export default App
