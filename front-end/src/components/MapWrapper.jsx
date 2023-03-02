import { Wrapper } from '@googlemaps/react-wrapper'

export default function Map({ Component, ...props }) {
	return (
		<Wrapper apiKey={'AIzaSyCHidGyCom_sk7-LfSvSUB-jt9l1tQLvpQ'}>
			<Component {...props} />
		</Wrapper>
	)
}
