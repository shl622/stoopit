import { createContext } from 'react'

const mapContext = createContext({
	location: { lat: 40.7309, lng: -73.9973 },
	setLocation: () => null
})
export const MapProvider = mapContext.Provider
export default mapContext
