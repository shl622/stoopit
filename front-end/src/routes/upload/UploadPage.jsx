import { useLocation } from 'react-router-dom'
import { Wrapper } from '@googlemaps/react-wrapper'
import SubmitForm from '../../components/SubmitForm/SubmitForm'

export default function UploadPage() {
	const location = useLocation()
	const imageBlob = location.state?.imageBlob

	return (
		<>
			<Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
				<SubmitForm imageBlob={imageBlob} />
			</Wrapper>
		</>
	)
}
