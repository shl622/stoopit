const { Schema, model } =require('mongoose');

const locationSchema = new Schema({
    lat: {type:String},
    lng: {type:String}
})

const stoopSchema = new Schema({
    id: {type:Number},
    title: {type:String},
    location: locationSchema,
    image: {type:String},
    description: {type:String}
})

export const stoop = model('stoop', stoopSchema)