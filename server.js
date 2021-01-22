const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist/mynotes'));


app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname + '/dist/mynotes/index.html'));
});

app.listen(process.env.PORT || 8000);