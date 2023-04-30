const http = require('http');
require('dotenv').config();
const express = require('./lib/express');
const { writeFile, readFile } = require('./utils/model');
const url = require('url');

// PORT
const PORT = process.env.PORT || 5000;

// Server running function
function httpServer(req, res) {
	// Express Class
	const app = new express(req, res);

	// Categories GET
	app.get('/categories', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		const category = readFile('category');
		const subCategory = readFile('subCategory');

		category.map((item) => {
			item.subCategory = subCategory.filter((items) => {
				return items.category_id == item.category_id && delete items.category_id;
			});
		});

		res.end(JSON.stringify(category));
	});

	// SubCategories GET
	app.get('/subcategories', (req, res) => {
		res.setHeader('Content-Type', 'application/json');

		const subCategories = readFile('subCategory');
		const products = readFile('products');

		subCategories.map((subCategory) => {
			(subCategory.products = products.filter(
				(product) => product.sub_category_id == subCategory.sub_category_id,
			)),
				delete subCategory.category_id;
		});

		res.end(JSON.stringify(subCategories));
	});

	// Products GET
	app.get('/products', (req, res) => {
		res.setHeader('Content-Type', 'application/json');

		try {
			if (req.query.length) {
				const data = product.filter(
					(item) => item.sub_category_id == req.query.sub_category_id,
				);
				writeFile(JSON.stringify(data));
			}else {
				throw new Error('Subcategory not found')
			}
		} catch (error) {
			res.writeHead(401, { 'Content-type': 'application/json' });
			res.end({ status: 401, message: error.message });
		}
	});
}

// Server
const server = http.createServer(httpServer);

// listen server
server.listen(PORT, () => console.log('Server running on port ' + PORT));
