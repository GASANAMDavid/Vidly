// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken')
// import config from 'config';
const config = require('config')
// import Joi from 'joi'
const Joi = require('joi')

// import mongoose from 'mongoose'
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    console.log("No private Key Specified")
    return token;
}

const Register = mongoose.model('User', userSchema);

function validateRegister(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        // email: Joi.string().min(5).max(255).required().email(),
        email: Joi.string().min(5).max(255).regex(/^(?:[a-zA-Z\d][a-zA-Z\d_-]{5,10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/).required(),
        password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
        isAdmin: Joi.boolean()
    });

    return schema.validate(user)
}

module.exports.Register = Register
module.exports.validateRegister = validateRegister