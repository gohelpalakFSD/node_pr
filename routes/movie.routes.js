const express = require('express');

const routes = express.Router();

const { addpage, viewpage, adddata, deletedata, edit, update} = require('../controllers/movie.controller');
const Movie = require('../models/movie.model');



routes.get('/',addpage)
routes.get('/views',viewpage)
routes.post('/insert',Movie.uploadImage,adddata)
routes.get('/delete/:id',deletedata)
routes.get('/edit/:id',edit)
routes.post('/update/:id',Movie.uploadImage,update)
 
module.exports = routes;