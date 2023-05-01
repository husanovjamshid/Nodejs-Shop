const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Here is a function to read the data
function readFile(filename) {
	const data = fs.readFileSync(path.resolve('db', filename + '.json'), 'utf-8');
	return JSON.parse(data);
}

// Here is a function to write the data
function writeFile(filename, data) {
	fs.writeFileSync(
		path.resolve('db', filename + '.json'),
		JSON.stringify(data, null, 4),
	);
}

// Here is a function to HASH the data
function hashPassword(data) {
	return crypto.createHash('sha256').update(data).digest('hex');
}

module.exports = { readFile, writeFile, hashPassword };
