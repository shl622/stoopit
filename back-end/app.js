// import
const express = require('express')
const path = require('path')
const fileupload = require('express-fileupload')
const cors = require('cors')

const app = express()
const port = 8080
const cors = require('cors')

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
	  createParentPath: true,
	})
  );



// close port
const close = () => {
	listener.close()
}

// Serve static files from the build folder
// app.use(express.static(path.join(__dirname, '../front-end/build')))
// app.get('/', (req, res) => {

// 	res.sendFile(path.join(__dirname, '../front-end/build/index.html'))
// })

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

// TODO: change upload location to S3 bucket instead of local storage, extract into a router
app.post('/api/stoop', (req, res) => {
	// show difference in stoopdatabase length for testing
	// console.log(stoopDatabase.length)

	// get location as array of numbers
	const location = req.body.location.replaceAll(' ', '').split(',');
	try {
		// error if no image file
		if (!req.files) {
			res.send({
				status: 'failed',
				message: 'No file',
			});
		} else {
			let file = req.files.file;
			let filePath = ('./uploads/' + Date.now() + file.name.replaceAll(' ', ''));
			file.mv(filePath);
			res.send({
				status: 'success',
				message: 'File successfully uploaded',
				data: {
					name: file.name,
					mimetype: file.mimetype,
					size: file.size,
				},
			});
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
		res.status(500).send(err);
	}

	// show difference in database length
	console.log(stoopDatabase.length)
})

// export express app
module.exports = app
