import express from 'express';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import {Register } from '../models/register.js'
// import _ from 'lodash';

const auth_router = express.Router();

auth_router.post('/', async (req, res) => {

    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await Register.findOne({ email: req.body.email})
    if (!user) return res.status(400).send('Invalid email or password..')
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password..')
    
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(true);
    

})

function validateUser(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).regex(/^(?:[a-zA-Z\d][a-zA-Z\d_-]{5,10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/).required(),
        password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required()
    });

    return schema.validate(req)
}

export { auth_router };