import './SubmitForm.css'

import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { useLocationHook } from '../../hooks/useLocationHook'
import SelectionMap from '../Maps/MapSelection/MapSelection'
import ImgIcon from '../Icons/Img'
import Map from '../../containers/MapWrapper'

const SubmitForm = ({ imageBlob = undefined }) => {
	const [selectedFile] = useState(imageBlob)
	const [preview, setPreview] = useState()
	const [showSelectionMap, setShowSelectionMap] = useState(false)
	const currentPosition = useLocationHook()
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors }
	} = useForm({
		defaultValues: {
			title: '',
			description: '',
			location: ''
		}
	})

	function handleShowSelectionMap() {
		setShowSelectionMap(!showSelectionMap)
	}

	const handleGeoLocation = (loc) => {
		setValue('location', `${loc.lat}, ${loc.lng}`)
	}

	useEffect(() => {
		window.history.replaceState({}, document.title)
	}, [])

	const onSubmit = (data) => {
		data.image = selectedFile
		console.log(data)

		// FOR BACKEND
		// const res = await fetch('SOMETHING', {
		// 	method: 'POST',
		// 	body: formData,
		// 	}).then((res) => res.json());
		// console.log(res);
		// alert(JSON.stringify(`${res.message}, status: ${res.status}`));
	}

	const setMapLocation = (location) => {
		handleShowSelectionMap()
		handleGeoLocation(location)
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

	return (
		<div className="prose">
			<h1>New Stoop Upload Form</h1>
			<form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control">
					<label
						htmlFor="stoopimage"
						className="input-group input-group-vertical"
					>
						<span>Image</span>
						<div className="imgContainer input input-bordered">
							{preview && <img alt="Stoop" src={preview} />}
							{!preview && <ImgIcon />}
						</div>
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
							disabled
							name="location"
							{...register('location', {
								required: 'Location is required.',
								pattern: {
									value: /^(?!.*undefined)^(?!.*null).*/,
									message: 'Location error: please try again'
								}
							})}
						/>
					</label>
					{errors.location && (
						<p className="errorMsg">{errors.location.message}</p>
					)}

					<div className="buttonWrapper">
						<button
							className="btn btn-info "
							type="button"
							onClick={() => handleGeoLocation(currentPosition)}
						>
							Use Current Location
						</button>
						<button
							className="btn btn-info"
							type="button"
							onClick={handleShowSelectionMap}
						>
							{' '}
							Select on Map
						</button>
					</div>
					{showSelectionMap && (
						<div className="mapDiv">
							<Map
								Component={SelectionMap}
								center={currentPosition}
								setMapLocation={setMapLocation}
								close={setShowSelectionMap}
							/>
						</div>
					)}
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
