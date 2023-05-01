// import
const express = require('express')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const stoopDB = require('./models/stoop')

dotenv.config()
const app = express()
const port = 8080

//change domain for static files based on production or dev
const domain =
	process.env.NODE_ENV === 'production'
		? process.env.domain
		: 'http://localhost:8080'

const { calculateDistance } = require('./utils/distance.js')

// override default cors policy
const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) }
}

app.use(cors(corsOptions))

app.use(
	fileUpload({
		createParentPath: true
	})
)

// Serve static files from the build folder
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

app.get('/api/stoops', async (req, res) => {
	const query = req?.query
	if (!req?.query || !(query?.lat && query?.lng && query?.range)) {
		res.status(400).json({
			error: 'Request must have `lat`, `lng`, and `range` query parameters.'
		})
		return
	}
	const queryLat = parseFloat(query.lat)
	const queryLng = parseFloat(query.lng)
	const queryRange = parseFloat(query.range)
	try {
		const stoopsFound = await stoopDB.find({})
		const filteredStoops = stoopsFound.filter(
			(stoop) =>
				calculateDistance(
					queryLat,
					queryLng,
					stoop.location.lat,
					stoop.location.lng
				) <= queryRange
		)
		res.status(200).json({
			length: filteredStoops.length,
			data: filteredStoops
		})
	} catch (err) {
		console.log(err.message)
	}
})

app.get('/api/stoop', async (req, res) => {
	const query = req?.query
	if (!req?.query || !query?.id) {
		res.status(400).json({
			error: 'Request must have `id` query parameter.'
		})
		return
	}

	const stoopId = query.id

	try {
		const stoopFound = await stoopDB.findById(stoopId)
		res.status(200).json({
			data: stoopFound
		})
		return
	} catch (err) {
		console.log(err.message)
		res.status(404).json({
			error: `error`
		})
	}
})

app.post('/api/stoop', async (req, res) => {
	// get location as array of numbers
	const location = req.body.location.replaceAll(' ', '').split(',')
	try {
		// error if no image file
		if (!req.files) {
			res.send({
				status: 'failed',
				message: 'No file'
			})
		} else {
			let file = req.files.file
			let filename = Date.now() + file.name.replaceAll(' ', '')
			let filePath = path.join(__dirname, `./uploads/${filename}`)

			file.mv(__dirname + '/uploads/' + filename)
			const newStoop = await stoopDB.create({
				stoopId: parseInt(
					Date.now() + Math.floor(Math.random() * 10).toString()
				),
				title: req.body.title,
				location: {
					lat: parseFloat(location[0]),
					lng: parseFloat(location[1])
				},
				image: `${domain}/uploads/${filename}`,
				description: req.body.description
			})
			res.send({
				status: 'success',
				message: 'File successfully uploaded',
				data: {
					name: file.name,
					mimetype: file.mimetype,
					size: file.size
				}
			})
		}
	} catch (err) {
		console.log(err.message)
		res.status(500).send(err)
	}
})

async function runApp() {
	try {
		await mongoose.connect(process.env.mongoURI)
		const listener = app.listen(port, () => {
			console.log(`Listening on port ${listener.address().port}`)
		})
		const close = () => {
			listener.close()
		}
	} catch (err) {
		console.log(err.message)
	}
}

runApp()
// export express app
module.exports = app
