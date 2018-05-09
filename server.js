const express = require('express');

const instapics = require('./instapics');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
    res.render('index', {title: 'instaprova'});
    next();
});

app.get('/getpics', (req, res) => {
    let id;
    let queryHash;
    let username = decodeURIComponent(req.query.link);
    let pagePromise = instapics.getPage({host: 'www.instagram.com', path: '/'+username+'/'});
    pagePromise.
	then((page) => {
	    // scrape id from the page
	    id = instapics.getId(page);
	    // get path to profile page container
	    let profilePageContainerPath = instapics.getProfilePageContainerPath(page);
	    // return a promise to the profile page container
	    return instapics.getPage({host: 'www.instagram.com', path: instapics.getProfilePageContainerPath(page)});
	}, (err) => {
	    console.log(err);
	})
	.then( (profilePageContainer) => {
	    // scrape query hash from profile page container
	    queryHash = instapics.getQueryHash(profilePageContainer+'/');
	    res.set('Content-Type', 'text/plain');
	    res.send(profilePageContainer);
	}, (err) => {
	    console.log(err);
	});
});

app.listen(3000, () => console.log('Listening on port 3000!'));
