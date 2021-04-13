import { Rental, validateRental } from '../models/rental.js';
import { Customer } from '../models/customer.js'
import { Movie } from '../models/movie.js';
import {auth} from '../middleware/auth.js'

import mongoose from 'mongoose';
import express from 'express';
import Fawn from 'fawn'

Fawn.init(mongoose);
const rental_router = express.Router();


rental_router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut')
    res.send(rentals)
})

rental_router.get('/:id', async (req,res) =>{
    const rental = await Rental.findById(req.params.id)
    if(!rental) return res.status(404).send(`The rental name with ID ${req.params.id} was not found!!!`);
    res.send(rental)
});

rental_router.post('/', auth, async (req, res) => {
    const { error } = validateRental(req.body);

    if (error) return res.status(400).send(error.details[0].message);
    
    const customer = await Customer.findById(req.body.customerId)
    if(!customer) return res.status(400).send("Invalid Customer...")
    
    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(400).send("Invalid Movie...")
    
    if(movie.numberinStock === 0 ) return res.status(400).send('Movie Out of Stock...!!!!!')
    
    let rental = new Rental({
        customer:{
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _d: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate 
        }
    });
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {$inc: { numberInStock: -1 }})
            .run()
         
        res.send(rental);
    }
    catch (ex){
        res.status(500).send('Something Failed....')
    }
} );


export { rental_router }
