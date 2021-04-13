import Joi from 'joi';
import { genreSchema } from './genre.js'
import mongoose from 'mongoose'
const Movie = mongoose.model('Movies', new mongoose.Schema({
title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255
},
genre: {
    type: genreSchema,
    required: true
},
numberInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 255
},
dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 255
}
}));


function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().required().trim().min(5).max(50),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()

    })

    return schema.validate(movie)
}



export { Movie, validateMovie}