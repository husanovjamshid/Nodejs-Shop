const { writeFile, readFile } = require('../utils/model');

// Subcategory controller
const SubCategories = {
	GET: (req, res) => {
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
	},

	POST: (req, res) => {
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
			res.json(200, { status: 200, success: 'SubCategory created' });
		});
	},
	PUT: (req, res) => {
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
			res.json(200, { status: 200, success: 'SubCategory changed' });
		});
	},

	DELETE: (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const subCategory = readFile('subCategory');

			const { sub_category_id } = JSON.parse(str);
			const newCategory = subCategory.filter(
				(item) => item.sub_category_id != sub_category_id,
			);

			writeFile('subCategory', newCategory);
			res.json(200, { status: 200, success: 'SubCategory deleted' });
		});
	},
};

module.exports = SubCategories;
