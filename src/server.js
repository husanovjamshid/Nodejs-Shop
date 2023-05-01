const http = require('http');
require('dotenv').config();
const express = require('./lib/express');
const Categories = require('./controllers/category.controller');
const SubCategories = require('./controllers/subCategory.controller');
const Product = require('./controllers/product.controller');

// PORT
const PORT = process.env.PORT || 5000;

// Server running function
function httpServer(req, res) {
	
	// Express Class
	const app = new express(req, res);

	// Categories GET
	app.get('/categories', Categories.GET);

	// Categories POST
	app.post('/categories', Categories.POST);

	// Categories PUT
	app.put('/categories', Categories.PUT);

	// Categories DELETE
	app.delete('/categories', Categories.DELETE);

	// SubCategories GET
	app.get('/subcategories', SubCategories.GET);

	// SubCategories POST
	app.post('/subcategories', SubCategories.POST);

	// SubCategories PUT
	app.put('/subcategories', SubCategories.PUT);

	// SubCategories DELETE
	app.delete('/subcategories', SubCategories.DELETE);

	// Products GET
	app.get('/products', Product.GET);

	// Products POST
	app.post('/products', Product.POST);

	// Products PUT
	app.put('/products', Product.PUT);

	// Products DELETE
	app.delete('/products', Product.DELETE);
}

// Server
const server = http.createServer(httpServer);

// listen server
server.listen(PORT, () => console.log('Server running on port ' + PORT));
