const https = require('https');

module.exports = {
    getPage: getPage,
    getProfilePageContainerLink: getProfilePageContainerLink
};

function getPage (url) {
    return new Promise( (resolve, reject) => {
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
		    resolve(rawData);
		} catch (e) {
		    reject(e);
		}
	    });
	}).on('error', (e) => {
	    reject(e);
	});
    });
};

function getProfilePageContainerLink (page) {
    //console.log(page);
    let link = /\/static\/bundles\/base\/ProfilePageContainer.js\/\w+.js/.exec(page)[0];
    return link;
};
