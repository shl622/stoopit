const mongoose = require('mongoose')

// Connect to MongoDB
// TODO: connect to MongoDB Atlas
mongoose.connect('', {
	// add your MongoDB connection URL here
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
})

// Create a schema for stoops
const stoopSchema = new mongoose.Schema({
	id: Number,
	title: String,
	description: String,
	timestamp: String,
	location: { lat: Number, lng: Number },
	image: String
})

// Create a model for stoops
const Stoop = mongoose.model('Stoop', stoopSchema)

// CURD operations
// Create
const createStoop = async (stoop) => {
	try {
		const newStoop = new Stoop(stoop)
		await newStoop.save()
	} catch (error) {
		console.error(error)
	}
}

// Update
const updateStoop = async (id, stoop) => {
	try {
		await Stoop.findByIdAndUpdate(id, stoop)
	} catch (error) {
		console.error(error)
	}
}

// Read
const getStoops = async () => {
	try {
		const stoops = await Stoop.find()
		return stoops
	} catch (error) {
		console.error(error)
	}
}

// Delete
const deleteStoop = async (id) => {
	try {
		await Stoop.findByIdAndDelete(id)
	} catch (error) {
		console.error(error)
	}
}

module.exports = { createStoop, updateStoop, getStoops, deleteStoop }
