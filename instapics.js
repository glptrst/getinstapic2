const https = require('https');

module.exports = {
    getPage: getPage
};

function getPage (url, handle) {
    https.get(url, (res) => {
	const { statusCode } = res;
	const contentType = res.headers['content-type'];

	let error;
	if (statusCode !== 200) {
	    error = new Error('Request Failed.\n' +
			      `Status Code: ${statusCode}`);
	}
	let rawData = '';
	res.on('data', (chunk) => {
	    rawData += chunk;
	});
	res.on('end', () => {
	    try {
		// handle.statusCode = 200;
		// handle.setHeader('Content-type', 'text/plain');
		// handle.end(rawData);
		handle.set('Content-Type', 'text/plain');
		handle.send(rawData);
	    } catch (e) {
		console.error(e.message);
	    }
	});
    }).on('error', (e) => {
	console.error(`Got error: ${e.message}`);
    });
};
