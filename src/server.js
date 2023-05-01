const http = require('http');
require('dotenv').config();
const express = require('./lib/express');
const Categories = require('./controllers/category.controller');
const SubCategories = require('./controllers/subCategory.controller');
const Product = require('./controllers/product.controller');
const Users = require('./controllers/user.controllers');

// PORT
const PORT = process.env.PORT || 5000;

// Server running function
function httpServer(req, res) {
	// Express Class
	const app = new express(req, res);

	// Users POST
	app.post('/users', Users.POST);

	// Categorys GET, POST, DELETE
	app.get('/categories', Categories.GET);
	app.post('/categories', Categories.POST);
	app.put('/categories', Categories.PUT);
	app.delete('/categories', Categories.DELETE);

	// SubCategorys GET, POST, DELETE
	app.get('/subcategories', SubCategories.GET);
	app.post('/subcategories', SubCategories.POST);
	app.put('/subcategories', SubCategories.PUT);
	app.delete('/subcategories', SubCategories.DELETE);

	// Produsts GET, POST, DELETE
	app.get('/products', Product.GET);
	app.post('/products', Product.POST);
	app.put('/products', Product.PUT);
	app.delete('/products', Product.DELETE);
}

// Server
const server = http.createServer(httpServer);

// listen server
server.listen(PORT, () => console.log('Server running on port ' + PORT));
