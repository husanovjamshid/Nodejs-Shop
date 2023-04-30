const http = require('http');
require('dotenv').config();
const express = require('./lib/express');
const { writeFile, readFile } = require('./utils/model');

const PORT = process.env.PORT || 5000;

function httpServer(req, res) {
	const app = new express(req, res);

	app.get('/categories', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		const category = readFile('category');
		const subCategory = readFile('subCategory');

		category.map((item) => {
			item.subCategory = subCategory.find((items) => {
				return items.category_id == items.category_id, delete items.category_id;
			});
		});

		res.end(JSON.stringify(category));
	});

	app.get('/subcategories', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(readFile('subCategory')));
	});
}

const server = http.createServer(httpServer);

server.listen(PORT, () => console.log('Server running on port ' + PORT));
