import { useLocation } from 'react-router-dom'
import SubmitForm from '../../components/SubmitForm/SubmitForm'

export default function UploadPage() {
	const location = useLocation()
	const imageBlob = location.state?.imageBlob

	return (
		<>
			<SubmitForm imageBlob={imageBlob} />
		</>
	)
}
