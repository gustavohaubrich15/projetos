const {Router} = require('express');
const DevController = require('./controllers/DevControllers')
const SearchController= require('./controllers/SearchController')

const routes = Router();

routes.get('/devs',DevController.listDevs)
routes.post('/devs', DevController.singUpDev)
routes.get('/search',SearchController.searchDev)

module.exports =routes;