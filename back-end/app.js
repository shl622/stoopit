// import
const express = require('express')
const app = express()
const path = require('path')
const port = 8080
const cors = require('cors')

const { stoopDatabase } = require('./mockData/stoopDatabase.js')
const { calculateDistance } = require('./utils/distance.js')

app.use(cors())
// listen on port 8080
const listener = app.listen(port, () => {
	console.log(`Listening on port ${listener.address().port}`)
})

// close port
const close = () => {
	listener.close()
}

// Serve static files from the build folder
// app.use(express.static(path.join(__dirname, '../front-end/build')))
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../front-end/build/index.html'))
// })

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

// export express app
module.exports = app
