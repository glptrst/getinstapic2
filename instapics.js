const https = require('https');

module.exports = {
    getPage: getPage,
    getProfilePageContainerPath: getProfilePageContainerPath,
    getQueryHash: getQueryHash,
    getId: getId
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
}

function getProfilePageContainerPath (page) {
    let link = /\/static\/bundles\/base\/ProfilePageContainer.js\/\w+.js/.exec(page)[0];
    return link;
}

function getId (page) {
    let id = /"owner":{"id":"\d+/.exec(page)[0];
    id = id.slice(15, id.length);
    return id;
}

function getQueryHash (page) {
    let queryHash = /o.pagination:o},queryId:"\w+"/.exec(page)[0];
    queryHash = queryHash.slice(queryHash.indexOf('queryId:"') + 9, queryHash.length-1);
    return queryHash;
}
