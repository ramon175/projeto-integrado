
// This application uses express as its web server
var express = require('express');
var fs = require('fs');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var path = require('path');

// create a new express server
var app = express();

require('./server/server')(app);
require('./server/routes')(app);

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use('/style', express.static(path.join(__dirname, 'views/style')))

