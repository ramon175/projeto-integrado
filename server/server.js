module.exports = function(app){

	var https = require('https');
	var bodyParser = require('body-parser');
	var express = require('express');
	var fs = require('fs');

	app.use(bodyParser.urlencoded());
    app.use(bodyParser.json());    
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
	
    var port = process.env.PORT || 9080
    
	app.listen(port, () => {
		console.log("To view your app, open this link in your browser: http://localhost:" + port);
	});

	app.get('/',(req,res) => {
        res.render('index.html');
	});
	
	app.get('/nacionais',(req,res) => {
		res.render('index.html')
	});

	app.get('/importados',(req,res) => {
		res.render('index.html')
	});

	app.get('/cadastrar',(req,res) => {
		res.render('cadastro.html');
	});

	app.get('/countries',(req,res) => {
		res.render('countries.html');
	});
	



}