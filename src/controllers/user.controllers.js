const { readFile, hashPassword } = require('../utils/model');

const Users = {
	POST: (req, res) => {
		let str = '';
		req.on('data', (chunk) => (str += chunk));
		req.on('end', () => {
			const user = readFile('users');
			try {
				const { username, password } = JSON.parse(str);
				
				const admin = user.filter(
					(item) =>
						item.username == username && item.password == hashPassword(password),
				);

				if (admin.length == 0) {
					throw new Error('Invalid username or password');
				}

				res.writeHead(200, { 'Content-type': 'application/json' });
				res.end(JSON.stringify({ status: 200, success: 'Ok' }));
			} catch (error) {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ status: 400, message: error.message }));
			}
		});
	},
};

module.exports = Users;
