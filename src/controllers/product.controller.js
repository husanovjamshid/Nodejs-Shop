const { writeFile, readFile } = require('../utils/model');


// Products controller
const Product = {
	GET: (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		const product = readFile('products');
		const subCategory = readFile('subCategory');

		// Products map and sub_category_id
		product.map((product) => {
			product.category_id = subCategory.find(
				(subCategory) => product.sub_category_id == subCategory.sub_category_id,
			).category_id;
		});

		
		let data = product.filter((item) => {
			let products = true;
			for (key in req.query) {
				products = products && item[key] == req.query[key];
			}
			return products;
		});

		res.end(JSON.stringify(data));
	},

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

				res.json(200, { status: 200, success: 'Product deleted' });
			} catch (error) {
				res.json(400, { status: 400, message: error.message });
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
			res.json(200, { status: 200, success: 'Product changed' });
		});
	},

	DELETE: (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const product = readFile('products');

			const { product_id } = JSON.parse(str);
			const newProduct = product.filter((item) => item.product_id != product_id);

			writeFile('products', newProduct);
			res.json(200, { status: 200, success: 'Product deleted' });
		});
	},
};

module.exports = Product;
