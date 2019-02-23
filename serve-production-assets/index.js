var express = require('express');
var app = express();
var path = require('path');
var public = path.join(__dirname,"..", 'dist');
PORT=3000;
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});

app.use('/', express.static(public));
console.log(`Start: port ${PORT}`);
app.listen(PORT);