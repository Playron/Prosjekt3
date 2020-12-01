import express from 'express';
import User from './user.js'
const router = express.Router();

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name').get((req, res) => {
    const username = req.params.name
    //Shows all movies containing the search term, position insensitive 
    User.find({ "username" : username}) 
        .then(user => res.json(user))
    });
router.route('/add').post((req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    newUser.save();
    console.log(req.body.username)

    res.redirect('/');
});
export default router;