const express = require('express');
const path = require('path');

const instapics = require('./instapics');

const app = express();

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.get('/getpics/', (req, res, next) => {
    let link = decodeURIComponent(req.query.link);
    instapics.getPage(link, res);
});

app.listen(3000, () => console.log('Listening on port 3000!'));


