// import
const express = require('express')
const fs = require('fs')
const path = require('path')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const stoopDB = require('./models/stoop')
const s3 = require('@aws-sdk/client-s3')

dotenv.config()
const app = express()
const port = 8080

const environment = process?.env?.NODE_ENV ?? 'development'

//change domain for static files based on production or dev
const domain =
	environment === 'production'
		? 'https://sea-turtle-app-pvtu7.ondigitalocean.app'
		: 'http://localhost:8080'

const client = new s3.S3Client({
	region: 'us-east-2',
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	}
})

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

app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

if (environment === 'production') {
	const buildPath = path.resolve(__dirname, '../front-end/build')
	const index = path.join(buildPath, 'index.html')

	// Setup build path as a static assets path
	app.use(express.static(buildPath))
	// Serve index.html on unmatched routes
	app.get('/', (req, res) => res.sendFile(index))
	app.get('/map', (req, res) => res.sendFile(index))
	app.get('/upload', (req, res) => res.sendFile(index))
	app.get('/map/:id', (req, res) => res.sendFile(index))
}

// Serve static files from the uploads folder
const uploadsDir = path.join(__dirname, 'uploads')
app.use('/uploads', express.static(uploadsDir))

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
				) <= queryRange && (stoop?.env ?? 'production') === environment
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
		if (stoopFound.env === 'development') {
			throw new Error('Requested development environment stoop')
		}
		res.status(200).json({
			data: stoopFound
		})
		return
	} catch (err) {
		console.log(err.message)
		res.status(404).json({
			error: `Error finding stoop by id`
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
			let uploadDir = path.join(__dirname, 'uploads')
			let filePath = path.join(uploadDir, filename)

			const s3Params = {
				Bucket: 'stoopit-data',
				Key: `uploads/${filename}`,
				Body: file.data,
				ContentType: file.mimetype
			}
			const putObject = new s3.PutObjectCommand(s3Params)
			const uploadResponse = await client.send(putObject)

			const newStoop = await stoopDB.create({
				stoopId: parseInt(
					Date.now() + Math.floor(Math.random() * 10).toString()
				),
				title: req.body.title,
				location: {
					lat: parseFloat(location[0]),
					lng: parseFloat(location[1])
				},
				image: `https://stoopit-data.s3.us-east-2.amazonaws.com/uploads/${filename}`,
				description: req.body.description,
				env: environment === 'development' ? environment : undefined
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
