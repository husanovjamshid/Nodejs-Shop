const { writeFile, readFile } = require('../utils/model');

const Categories = {
	GET: (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		const category = readFile('category');
		const subCategory = readFile('subCategory');

		category.map((item) => {
			item.subCategory = subCategory.filter((items) => {
				return items.category_id == item.category_id && delete items.category_id;
			});
		});

		res.end(JSON.stringify(category));
	},

	POST: (req, res) => {
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
	},
	PUT: (req, res) => {
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
	},

	DELETE: (req, res) => {
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
	},
};

module.exports = Categories;
