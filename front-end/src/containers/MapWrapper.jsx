/* Examples for Map usage	
 	Format: center={{lat: , lng: }} 
	For when user wants to view full map- use geolocation
 	{currentPosition && (
		<MapWrapper Component={FullMap} center={currentPosition} />
	)}
	<TestForm /> 
	For when user wants to view specific stoop location
	<MapWrapper Component={SingleStoopMap} /> */

import { Wrapper } from '@googlemaps/react-wrapper'

export default function Map({ Component, ...props }) {
	return (
		<Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
			<Component {...props} />
		</Wrapper>
	)
}
