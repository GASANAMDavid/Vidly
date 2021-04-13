const {Register} = require('../../../models/register.js')
const jwt = require('jsonwebtoken')
const config = require('config')
const mongoose = require('mongoose')

describe('user.generateToken', () => {
    it('Should return a valid Token', () => {
        const payload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true }
        const user = new Register(payload)
        const token = user.generateAuthToken()
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
        expect(decoded).toMatchObject({ _id: payload._id, isAdmin: true})
    })
}) 