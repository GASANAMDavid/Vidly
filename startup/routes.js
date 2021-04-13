import express from 'express';
import { error } from '../middleware/error.js';
import { router } from '../routes/genres.js';
import { home_router } from '../routes/home.js';
import  { customer_router} from '../routes/customers.js';
import { movie_router } from '../routes/movies.js';
import { rental_router } from '../routes/rentals.js';
import { register_router } from '../routes/registration.js';
import { auth_router } from '../routes/auth.js';

export default function routes(app){
    app.use(express.json()); // Middleware
    app.use('/api/genres', router);
    app.use('/', home_router);
    app.use('/api/customers', customer_router);
    app.use('/api/movies', movie_router);
    app.use('/api/rentals', rental_router);
    app.use('/api/register', register_router);
    app.use('/api/auth', auth_router);
    app.use(error);

}