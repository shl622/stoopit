// import
const express = require('express')
const path = require('path')
const fileupload = require('express-fileupload')
const cors = require('cors')

const app = express()
const port = 8080

const { stoopDatabase } = require('./mockData/stoopDatabase.js')
const { calculateDistance } = require('./utils/distance.js')

// override default cors policy
const corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) }
}

app.use(cors(corsOptions))

// listen on port 8080
const listener = app.listen(port, () => {
	console.log(`Listening on port ${listener.address().port}`)
})

app.use(
	fileupload({
		createParentPath: true
	})
)

// close port
const close = () => {
	listener.close()
}

// Serve static files from the build folder
app.use('/uploads', express.static(__dirname + '/uploads'))

app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// TODO: extract into a router to make code cleaner
app.get('/api/stoops', (req, res) => {
	const query = req?.query
	// If there's no query params or lat and lng are not params
	if (!req?.query || !(query?.lat && query?.lng && query?.range)) {
		res.status(400).json({
			error: 'Request must have `lat`, `lng`, and `range` query parameters.'
		})
		return
	}

	const queryLat = parseFloat(query.lat)
	const queryLng = parseFloat(query.lng)
	// Range in miles
	const queryRange = parseFloat(query.range)

	// Check "database" for every stoop within queryRange miles
	const stoopsFound = stoopDatabase.filter(
		(stoop) =>
			calculateDistance(
				queryLat,
				queryLng,
				stoop.location.lat,
				stoop.location.lng
			) <= queryRange
	)

	res.status(200).json({
		length: stoopsFound.length,
		data: stoopsFound
	})
})

app.get('/api/stoop', (req, res) => {
	const query = req?.query
	if (!req?.query || !query?.id) {
		res.status(400).json({
			error: 'Request must have `id` query parameter.'
		})
		return
	}

	const queryId = parseInt(query.id)

	const stoopFound = stoopDatabase.find((stoop) => {
		return stoop.id === queryId
	})

	if (!stoopFound) {
		console.log("stoop not found")
		res.status(404).json({
			error: `No stoop with id ${queryId} found.`
		})
		return
	}
	else{
		console.log("stoop found")
		res.status(200).json({
			data: stoopFound
		})
	}
})

// TODO: change upload location to S3 bucket instead of local storage, extract into a router
app.post('/api/stoop', (req, res) => {
	// show difference in stoopdatabase length for testing
	// console.log(stoopDatabase.length)

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
			let filePath = 'http://localhost:8080/uploads/' + filename

			file.mv(__dirname + '/uploads/' + filename)
			res.send({
				status: 'success',
				message: 'File successfully uploaded',
				data: {
					name: file.name,
					mimetype: file.mimetype,
					size: file.size
				}
			})
			stoopDatabase.push({
				id: +(Date.now() + Math.floor(Math.random() * 10).toString()),
				location: {
					lat: +location[0],
					lng: +location[1]
				},
				title: req.body.title,
				timestamp: Date.now(),
				image: filePath,
				description: req.body.description
			})
		}
	} catch (err) {
		res.status(500).send(err)
	}

	// show difference in database length
	console.log(stoopDatabase.length)
})

// export express app
module.exports = app
