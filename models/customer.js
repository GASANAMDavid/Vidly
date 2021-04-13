import Joi from 'joi';
import mongoose from 'mongoose'

const Customer = mongoose.model('Customers', new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false},
    name: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    },
    phone: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true
    }
}));


function validateCustomer(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(3).max(30).required().trim(),
        phone: Joi.string().min(3).trim().max(30)
    });

    return schema.validate(customer);
    
}

export { Customer }
export { validateCustomer }