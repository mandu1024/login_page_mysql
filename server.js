var express = require('express');

var cors = require('cors');

var router = require('./routes/index');
var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port Test ${port}`));