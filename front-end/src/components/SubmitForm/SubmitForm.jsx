import './SubmitForm.css'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import TestForm from '../Maps/TestForm'
// import imgIcon from '../../icons/img'

const SubmitForm = ({ imageBlob, getCurrentLocation }) => {
	const [selectedFile, setSelectedFile] = useState()
	const [preview, setPreview] = useState()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const onSubmit = (data) => {
		console.log(data)
	}

	const manageCurrentLocation = () => {
		getCurrentLocation()
		console.log(
			'this will get the current location using the getCurrentLocation function passed in props from App.jsx'
		)
	}

	const getMapLocation = () => {
		console.log(
			'this will get the current location using the map selector component passed in props from App.jsx'
		)
	}

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined)
			return
		}
		const objectUrl = URL.createObjectURL(selectedFile)
		setPreview(objectUrl)

		return () => URL.revokeObjectURL(objectUrl)
	}, [selectedFile])

	const handleUpload = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined)
			return
		}
		setSelectedFile(e.target.files[0])
	}

	return (
		<div>
			<form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control">
					<div className="imgContainer">
						{preview && <img alt="Stoop" src={preview} />}
						{/* {!preview && <imgIcon />} */}
					</div>
					<label
						htmlFor="stoopimage"
						className="input-group input-group-vertical"
					>
						<span>Image</span>
						<input
							id="stoopimage"
							className="input input-bordered"
							type="file"
							name="image"
							accept="image/*"
							{...register('image', {
								required: 'Image is required.'
							})}
							onChange={handleUpload}
						/>
					</label>
				</div>
				<div className="form-control">
					<label
						htmlFor="stooptitle"
						className="input-group input-group-vertical"
					>
						<span>Title</span>
						<input
							id="stooptitle"
							className="input input-bordered"
							type="text"
							name="title"
							{...register('title', {
								required: 'Title is required.'
							})}
						/>
					</label>
					{errors.title && (
						<p className="errorMsg">{errors.title.message}</p>
					)}
				</div>
				<div className="form-control">
					<label
						htmlFor="stoopdesc"
						className="input-group input-group-vertical"
					>
						<span>Description</span>
						<input
							id="stoopdesc"
							className="input input-bordered"
							type="textarea"
							name="description"
							{...register('description', {
								required: 'Description is required.'
							})}
						/>
					</label>
					{errors.description && (
						<p className="errorMsg">{errors.description.message}</p>
					)}
				</div>
				<div className="form-control">
					<label
						htmlFor="stooploc"
						className="input-group input-group-vertical"
					>
						<span>Location</span>
						<input
							id="stooploc"
							placeholder="Please use either button below to select location"
							className="input input-bordered input-warning"
							type="text"
							// disabled
							name="location"
							{...register('location', {
								required: 'Location is required.'
							})}
						/>
					</label>
					{errors.location && (
						<p className="errorMsg">{errors.location.message}</p>
					)}
					{/* this will be merged with Brian's code, which already provides these methods */}
					<TestForm />
					<button type="button" onClick={manageCurrentLocation}>
						Use Current Device Location
					</button>
					<button type="button" onClick={getMapLocation}>
						Select Location on Map
					</button>
				</div>
				<div className="form-control upload">
					<label htmlFor="stoopupload">
						<button
							className="btn btn-primary btn-block"
							id="stoopupload"
							type="submit"
						>
							Upload Stoop
						</button>
					</label>
				</div>
			</form>
		</div>
	)
}

export default SubmitForm
