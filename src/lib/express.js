const url = require('url');
const queryString = require('querystring');
class Express {
	constructor(req, res) {
		this.req = req;
		this.res = res;

		// This  does JSON.Stringify
		this.res.json = (status, data) => {
			this.res.writeHead(status, { 'Content-Type': 'application/json' });
			return res.end(JSON.stringify(data));
		};
	}

	// This function does get
	get(route, callback) {
		const { query, pathname } = url.parse(this.req.url);
		this.req.query = queryString.parse(query);
		if (pathname == route && this.req.method == 'GET') {
			callback(this.req, this.res);
		}
	}

	// This function does post
	post(route, callback) {
		if (this.req.url == route && this.req.method == 'POST') {
			callback(this.req, this.res);
		}
	}

	// This function does put
	put(route, callback) {
		if (this.req.url == route && this.req.method == 'PUT') {
			callback(this.req, this.res);
		}
	}

	// This function does delete
	delete(route, callback) {
		if (this.req.url == route && this.req.method == 'DELETE') {
			callback(this.req, this.res);
		}
	}
}

module.exports = Express;
