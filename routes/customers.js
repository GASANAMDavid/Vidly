import express from 'express';
import {Customer, validateCustomer} from '../models/customer.js'

const customer_router = express.Router();


customer_router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name')
    res.send(customers)
})

customer_router.get('/:id', async (req,res) =>{
    const customer = await Customer.findById(req.params.id)
    if(!customer) return res.status(404).send(`The Customer name with ID ${req.params.id} was not found!!!`);
    res.send(customer)
});

customer_router.post('/', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let customer = new Customer({
        isGold: req.body.isGold, 
        name: req.body.name, 
        phone: req.body.phone});

    customer = await customer.save()
    
    res.send(customer);
} );

customer_router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name}, {new: true})
    if(!customer) return res.status(404).send(`The Customer with ID ${req.params.id} was not found`);
    
    res.send(customer);


});

customer_router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send(`The customer with ID ${req.params.id} was not found`);
       
    res.send(customer);
});

export { customer_router };