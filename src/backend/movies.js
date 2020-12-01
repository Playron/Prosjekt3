import express from 'express';
import Movie from './movie.js';
const router = express.Router();

router.route('/').get((req, res) => {
    Movie.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Function lets us filter movies based on their published year
router.route('/movieyear/:year').get((req, res) => {
    const movieYear = parseInt(req.params.year);
    Movie.find({ "movieYear" : movieYear})
        .then(movie => res.json(movie))
    });

router.route('/movietitle/:name').get((req, res) => {
    const movieName = req.params.name
    //Under we can now for example search "a", and all movies that contain
    //"a" in their title will be shown.
    Movie.find({ "movieName" : {'$regex' : movieName, '$options' : 'i'}}) 
        .then(movie => res.json(movie))
    });

router.route('/add').post((req, res) => {
    const movieName = req.body.movieName;
    const movieYear = Number(req.body.movieYear);
    const movieDescription = req.body.movieDescription;
    const movieRating = Number(req.body.movieRating);

    const newMovie = new Movie({
        movieName,
        movieYear,
        movieDescription,
        movieRating,
    });

    newMovie.save()
        .then(() => res.json('Movie added'))
        .catch(err => res.status(400).json('Error ' + err));
});
export default router;