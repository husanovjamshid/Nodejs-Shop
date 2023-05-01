const { writeFile, readFile } = require('../utils/model');

const Product = {
	GET: (req, res) => {
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
	},
	// res.writeHead(400, { 'Content-Type': 'application/json' });
	// res.end(JSON.stringify({ status: 400, message: error.message }));
	POST: (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const products = readFile('products');

			try {
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
			} catch (error) {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ status: 400, message: error.message }));
			}
		});
	},
	PUT: (req, res) => {
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
	},

	DELETE: (req, res) => {
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
	},
};

module.exports = Product;
