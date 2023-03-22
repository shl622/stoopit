import './Toast.css'
// import { useState } from 'react'

export default function Toast({
	show = true,
	toastMessage = 'Verify Location'
}) {
	// TODO: make self contained
	// Toast component will have to be useState'd in separate file
	// const [show, setShow] = useState(false)
	// const [toastMessage, setToastMessage] = useState(false)
	// useImperativeHandle(ref, () => ({
	// 	showToast(msg = '') {
	// 		setShow(true)
	// 		setToastMessage(msg)
	// 		setTimeout(() => {
	// 			setShow(false)
	// 		}, timeout)
	// 	}
	// }))

	return show ? (
		<div className="toast toast-top toast-end">
			<div className="alert alert-info">
				<div>
					<span>{toastMessage}</span>
				</div>
			</div>
		</div>
	) : (
		<></>
	)
}
