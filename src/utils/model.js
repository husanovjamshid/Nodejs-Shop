const fs = require('fs');
const path = require('path');

function readFile(filename) {
	const data = fs.readFileSync(path.resolve('db', filename + '.json'), 'utf-8');
	return JSON.parse(data);
}

function writeFile(filename, data) {
	fs.writeFileSync(
		path.resolve('db', filename + '.json'),
		JSON.stringify(data, null, 4),
	);
}

module.exports = { readFile, writeFile };
