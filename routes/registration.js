import express from 'express';
import bcrypt from 'bcrypt';
import {auth} from '../middleware/auth.js'
import {Register, validateRegister } from '../models/register.js'
import _ from 'lodash';
const register_router = express.Router();


register_router.get('/me', auth, async (req, res) => {
    const user = await Register.findById(req.user._id)
                                .select('-password')
    res.send(user)

})

register_router.post('/', async (req, res) => {

    const { error } = validateRegister(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    let user = await Register.findOne({ email: req.body.email})
    if (user) return res.status(400).send('User already registered...!')
    
    user = new Register(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password,salt);
    user = await user.save()

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));


})


export { register_router };