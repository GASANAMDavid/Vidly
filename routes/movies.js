import express from 'express';
import {auth} from '../middleware/auth.js'
import { Genre } from '../models/genre.js'
import { Movie, validateMovie } from '../models/movie.js'

const movie_router = express.Router();

movie_router.get('/', async (req,res) => {
    const movies = await Movie.find().sort('name')
    res.send(movies);
});


movie_router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie) return res.status(404).send(`The movie with ID ${req.params.id} was not found`);
    res.send(movie); 
});

movie_router.post('/', auth, async (req, res) => {

    const { error } = validateMovie(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if(!genre) return res.status(400).send('Invalid genre..');

    let movie = new Movie({
        title: req.body.title, 
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
     });

    movie = await movie.save()
    
    res.send(movie);
});


movie_router.delete('/:id', auth, async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send(`The movie with ID ${req.params.id} was not found`);
       
    res.send(movie);
});




export { movie_router }