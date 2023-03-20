import { Wrapper } from '@googlemaps/react-wrapper'

export default function MapWrapper({ Component, ...props }) {
	return (
		<Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
			<Component {...props} />
		</Wrapper>
	)
}
