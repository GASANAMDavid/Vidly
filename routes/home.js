import express from 'express';

const home_router = express.Router();
home_router.get('/', (req, res) => {
    res.render(index, {title: "Vidly Movie Rental App", message: "My Vidly App"});
})

export { home_router };