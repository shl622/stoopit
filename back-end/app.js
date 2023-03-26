// import
const express = require('express')
const app = express()
const port = 3000

// listen on port 3000
const listener = app.listen(port, () => {
	console.log(`Listening on port ${listener.address().port}`)
})

// close port
const close = () => {
	listener.close()
}

// export express app
module.exports = app
