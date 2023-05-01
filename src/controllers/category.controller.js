const { writeFile, readFile } = require('../utils/model');

// Category controller
const Categories = {
	GET: (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		const category = readFile('category');
		const subCategory = readFile('subCategory');

		// Gets the categorys and delete trash id
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

			try {
				const { category_name } = JSON.parse(str);
				const newCategory = {
					category_id: category.at(-1)?.category_id + 1 || 1,
					category_name,
				};

				if (!category_name) {
					throw new Error('Invalid request');
				}

				category.push(newCategory);
				writeFile('category', category);
				res.json(200, { status: 200, success: 'Category created' });
			} catch (error) {
				res.json(400, { status: 400, message: error.message });
			}
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
			res.json(200, { status: 200, success: 'Category changed' });
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
			res.json(200, { status: 200, success: 'Category deleted' });
		});
	},
};

module.exports = Categories;
