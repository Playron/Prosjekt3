import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import movieRoute from './movies.js';
import userRoute from './users.js'
import commentRoute from './comments.js'
const PORT = 4000;

mongoose.connect('mongodb://admin:admin@it2810-56.idi.ntnu.no:27017/moviesDB?authSource=admin', {useNewUrlParser: true,})
  .then(() => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.use('/movies', movieRoute)
  app.use('/users', userRoute)
  app.use('/comments', commentRoute)

  app.get('/', (req, res) => {
    res.send('We are home');
  })
  
  app.listen(PORT, () =>{
    console.log('Server is running on '+ PORT);
  })});

const connection = mongoose.connection;
connection.once("open", function() {
  console.log("MongoDB connection established sucessfully!");
 })




/* const {application} = require('express');
const express = require('express');
const app = express('mongoose');
const mongoose = require('mongoose');
const router = express.Router();
const Post = require('./post.tsx')

//Middlewares

//ROUTES
app.get('/', (req, res) => {
  res.send('Serveren er oppe');
});
router.post('/',(req,res) =>{
  console.log(req.body);
})
//Connect to database
mongoose.connect(
  process.env.DB_CONNECTION,
  {useNewUrlParser: true},
  () => console.log('Connected to database'),
);

router.get('/')

app.listen(27017);
 */