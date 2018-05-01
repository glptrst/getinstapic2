const express = require('express');

const instapics = require('./instapics');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
    res.render('index', {title: 'instaprova'});
    next();
});

app.get('/getpics/', (req, res, next) => {
    let link = decodeURIComponent(req.query.link);
    let pagePromise = instapics.getPage(link);
    pagePromise.then( (page) => {
	res.set('Content-Type', 'text/plain');
	res.send(page);
	next();
    }, (err) => {
	console.log(err);
	next();
    });
});

app.listen(3000, () => console.log('Listening on port 3000!'));


