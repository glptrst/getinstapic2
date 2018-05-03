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
    let username = decodeURIComponent(req.query.link);
    let instaPageLink = `https://www.instagram.com/${username}/`;
    let pagePromise = instapics.getPage(instaPageLink);
    pagePromise.
	then((page) => {
	    let profilePageContainerLink = 'https://www.instagram.com' + instapics.getProfilePageContainerLink(page);
	    console.log(profilePageContainerLink);
	    // return a promise to the profile page container
	    return instapics.getPage(profilePageContainerLink);
	}, (err) => {
	    console.log(err);
	})
	.then( (profilePageContainer) => {
	    res.set('Content-Type', 'text/plain');
	    res.send(profilePageContainer);
	}, (err) => {
	    console.log(err);
	});
});

app.listen(3000, () => console.log('Listening on port 3000!'));
