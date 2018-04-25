const https = require('https');
const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/getpics/', (req, res, next) => {
    let link = decodeURIComponent(req.query.link);
    getPage(link, res);
});

app.listen(3000, () => console.log('Listening on port 3000!'));

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

