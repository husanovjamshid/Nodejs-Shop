const http = require('http');
require('dotenv').config();
const express = require('./lib/express');
const { writeFile, readFile } = require('./utils/model');

const PORT = process.env.PORT || 5000;

function httpServer(req, res) {
	const app = new express(req, res);

	app.get('/categories', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(readFile('category')));
	});

    app.get('/subcategories', (req, res) => {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(readFile('subCategory')));
	});

	// res.end(() => {
	// 	const data = readFile('users');
	// 	const news = {
	// 		user_id: 1,
	// 		username: 'Jamshid',
	// 		password: '12Aa$1oedijaoisidjao92831jsa$as',
	// 	};

	//     data.push(news)
	// 	writeFile('users', data)
	// });
}

const server = http.createServer(httpServer);

server.listen(PORT, () => console.log('Server Running on port ' + PORT));
