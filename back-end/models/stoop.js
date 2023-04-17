const { Timestamp } = require('mongodb');
const { Schema, model } =require('mongoose');

const locationSchema = new Schema({
    lat: {type:Number},
    lng: {type:Number}
})

const stoopSchema = new Schema({
    stoopId: {type:Number},
    title: {type:String},
    location: locationSchema,
    image: {type:String},
    description: {type:String}
}, {timestamps:true})

const stoopDB = model('stoop',stoopSchema)
module.exports = stoopDB