import './SubmitForm.css'
import { getLocationFromExifData } from '../../utils/location'
import { useForm } from 'react-hook-form'
import { useState, useEffect, useContext } from 'react'
import SelectionMap from '../Maps/MapSelection/MapSelection'
import ImgIcon from '../Icons/Img'
import MapWrapper from '../../containers/MapWrapper'
import mapContext from '../../context/map'
import { useNavigate } from 'react-router-dom'
import { translateCoordToAddress } from '../../utils/location'

const SubmitForm = ({ imageBlob = undefined }) => {
	const [selectedFile] = useState(imageBlob)
	const [preview, setPreview] = useState()
	const [showSelectionMap, setShowSelectionMap] = useState(false)
	const [selectedLocation, setSelectedLocation] = useState({})
	const navigate = useNavigate()
	const { currentPosition } = useContext(mapContext)

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

	useEffect(() => {
		async function fetchLocation() {
			try {
				const defaultLocation = await getLocationFromExifData(
					selectedFile
				)
				handleGeoLocation(defaultLocation)
			} catch (error) {
				console.error('Error:', error)
			}
		}

		if (selectedFile) {
			fetchLocation()
		}
	}, [selectedFile])

	function handleShowSelectionMap() {
		setShowSelectionMap(!showSelectionMap)
	}

	const handleGeoLocation = async (loc) => {
		setSelectedLocation(loc)
		setValue('location', await translateCoordToAddress(loc))
	}

	useEffect(() => {
		window.history.replaceState({}, document.title)
	}, [])

	const onSubmit = (data) => {
		const formData = new FormData()
		formData.append('file', selectedFile)
		for (const key of Object.keys(data)) {
			formData.append(`${key}`, data[key])
		}
		formData.set(
			'location',
			`${selectedLocation.lat}, ${selectedLocation.lng}`
		)
		fetch(
			`${
				process.env.NODE_ENV === 'production'
					? 'https://sea-turtle-app-pvtu7.ondigitalocean.app'
					: 'http://localhost:8080'
			}/api/stoop`,
			{
				method: 'POST',
				body: formData
			}
		)
			.then((res) => navigate('/'))
			.catch((err) => {
				console.log(err.message)
			})
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
		<div>
			<h1>New Stoop Upload</h1>
			<form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
				<div className="form-control">
					<label
						htmlFor="stoopimage"
						className="input-group input-group-vertical"
					>
						<span>Image</span>
						<div className="imgContainer input input-bordered">
							{preview && (
								<img
									className="img"
									alt="Stoop"
									src={preview}
								/>
							)}
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
							className="input input-primary"
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
							className="input input-primary"
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
						<div className="mapDiv map-fullscreen">
							<MapWrapper
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
