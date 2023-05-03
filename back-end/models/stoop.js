const { Timestamp } = require('mongodb')
const { Schema, model, Types } = require('mongoose')

const locationSchema = new Schema({
	lat: { type: Number },
	lng: { type: Number }
})

const stoopSchema = new Schema(
	{
		_id: { type: Types.ObjectId, auto: true },
		stoopId: { type: Number },
		title: { type: String },
		location: locationSchema,
		image: { type: String },
		description: { type: String },
		env: { type: String }
	},
	{ timestamps: true }
)

const stoopDB = model('stoop', stoopSchema)
module.exports = stoopDB
