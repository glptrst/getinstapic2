const express = require('express');

const instapics = require('./instapics');

const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
    res.render('index', {title: 'instaprova'});
});

app.get('/getpics/', (req, res, next) => {
    let link = decodeURIComponent(req.query.link);
    instapics.getPage(link, res);
});

app.listen(3000, () => console.log('Listening on port 3000!'));


