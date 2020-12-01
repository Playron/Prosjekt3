import express from 'express';
import Comment from './comment.js'
const router = express.Router();

router.route('/').get((req, res) => {
    Comment.find()
        .then(comments => res.json(comments))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name').get((req, res) => {
    const movieName = req.params.name
    Comment.find({ "movieName" : movieName}) 
        .then(movie => res.json(movie))
    });


router.route('/add').post((req, res) => {
    const newComment = new Comment({
        username: req.body.username,
        movieName: req.body.movieName,
        comment: req.body.comment
    });
    newComment.save()
        .then(() => res.json('Comment added'))
        .catch(err => res.status(400).json('Error ' + err));
});
export default router;