import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    movieName: {
        type: String,
        required: true,
        unique: true,
    },
    movieYear: {
        type: Number,
        required: false,
    },
    movieDescription: {
        type: String,
        requried: false,
    },
    movieRating:{
        type: Number,
        required: false,
    },
    moviePoster:{
        type: String,
        required: false
    }
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;