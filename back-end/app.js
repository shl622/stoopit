// import
const express = require('express')
const app = express()
const path = require('path')
const port = 3000

// listen on port 3000
const listener = app.listen(port, () => {
	console.log(`Listening on port ${listener.address().port}`)
})

// close port
const close = () => {
	listener.close()
}

// Serve static files from the build folder
app.use(express.static(path.join(__dirname, '../front-end/build')))
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../front-end/build/index.html'))
})

// export express app
module.exports = app
