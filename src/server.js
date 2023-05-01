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

	// Categories POST
	app.post('/categories', (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const category = readFile('category');

			const { category_name } = JSON.parse(str);

			const newCategory = {
				category_id: category.at(-1)?.category_id + 1 || 1,
				category_name,
			};

			category.push(newCategory);
			writeFile('category', category);

			res.writeHead(201, { 'Content-type': 'application/json' });
			res.end(JSON.stringify({ status: 201, success: 'Category created' }));
		});
	});

	// Categories PUT
	app.put('/categories', (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const category = readFile('category');

			const { category_id, category_name } = JSON.parse(str);

			const newCategory = category.find((item) => item.category_id == category_id);
			newCategory.category_name = category_name || newCategory.category_name;

			writeFile('category', category);

			res.writeHead(200, { 'Content-type': 'application/json' });
			res.end(JSON.stringify({ status: 200, success: 'Category changed' }));
		});
	});

	// Categories DELETE
	app.delete('/categories', (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const category = readFile('category');

			const { category_id } = JSON.parse(str);

			const newCategory = category.filter(
				(item) => item.category_id != category_id,
			);

			writeFile('category', newCategory);

			res.writeHead(200, { 'Content-type': 'application/json' });
			res.end(JSON.stringify({ status: 200, success: 'Category deleted' }));
		});
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

	// SubCategories POST
	app.post('/subcategories', (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const subCategory = readFile('subCategory');

			const { category_id, sub_category_name } = JSON.parse(str);

			const newCategory = {
				sub_category_id: subCategory.at(-1)?.sub_category_id + 1 || 1,
				category_id,
				sub_category_name,
			};

			subCategory.push(newCategory);
			writeFile('subCategory', subCategory);

			res.writeHead(201, { 'Content-type': 'application/json' });
			res.end(JSON.stringify({ status: 201, success: 'Category created' }));
		});
	});

	// SubCategories PUT
	app.put('/subcategories', (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const subCategory = readFile('subCategory');

			const { sub_category_id, sub_category_name } = JSON.parse(str);

			const newCategory = subCategory.find(
				(item) => item.sub_category_id == sub_category_id,
			);

			newCategory.sub_category_name =
				sub_category_name || newCategory.sub_category_name;

			writeFile('subCategory', subCategory);

			res.writeHead(200, { 'Content-type': 'application/json' });
			res.end(JSON.stringify({ status: 200, success: 'Category changed' }));
		});
	});

	// SubCategories DELETE
	app.delete('/subcategories', (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const subCategory = readFile('subCategory');

			const { sub_category_id } = JSON.parse(str);

			const newCategory = subCategory.filter(
				(item) => item.sub_category_id != sub_category_id,
			);

			writeFile('subCategory', newCategory);

			res.writeHead(200, { 'Content-type': 'application/json' });
			res.end(JSON.stringify({ status: 200, success: 'Category deleted' }));
		});
	});

	// Products GET
	app.get('/products', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		const product = readFile('products');

		let { sub_category_id, model } = req.query;

		const data = product.filter((item) => {
			if (sub_category_id != undefined && model != undefined) {
				return item.sub_category_id == sub_category_id && item.model == model;
			} else {
				return item.sub_category_id == sub_category_id || item.model == model;
			}
		});

		res.end(JSON.stringify(data));
	});

	// Products POST
	app.post('/products', (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const products = readFile('products');

			const { sub_category_id, model, product_name, color, price } =
				JSON.parse(str);

			const newproduct = {
				product_id: products.at(-1)?.product_id + 1 || 1,
				sub_category_id,
				model,
				product_name,
				color,
				price,
			};

			products.push(newproduct);
			writeFile('products', products);

			res.writeHead(201, { 'Content-type': 'application/json' });
			res.end(JSON.stringify({ status: 201, success: 'Category created' }));
		});
	});

	// Products PUT
	app.put('/products', (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const product = readFile('products');

			const { product_id, product_name, price } = JSON.parse(str);

			const newProduct = product.find((item) => item.product_id == product_id);

			newProduct.product_name = product_name || newProduct.product_name;
			newProduct.price = price || newProduct.price;

			writeFile('products', product);

			res.writeHead(200, { 'Content-type': 'application/json' });
			res.end(JSON.stringify({ status: 200, success: 'Category changed' }));
		});
	});

	// Products DELETE
	app.delete('/products', (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const product = readFile('products');

			const { product_id } = JSON.parse(str);

			const newCategory = product.filter((item) => item.product_id != product_id);

			writeFile('products', newCategory);

			res.writeHead(200, { 'Content-type': 'application/json' });
			res.end(JSON.stringify({ status: 200, success: 'Category deleted' }));
		});
	});
}

// Server
const server = http.createServer(httpServer);

// listen server
server.listen(PORT, () => console.log('Server running on port ' + PORT));
