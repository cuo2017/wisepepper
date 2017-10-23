var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(){
	var app =	express();
	app.use(bodyParser.json({limit: "50mb"}));
	app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));// base64太大，改变post大小 

	app.use(express.static("public"));

	require('../app/routes/user.route.js')(app);

	
	//404
	app.use(function(req, res, next){
		res.status(404);
		try{
			return res.json('404 not found');
		}catch(e){
			console.error('404 set header after sent');
		}


	});

	//500
	app.use(function(req, res, next){
		if(!err){return next()}
			res.status(500);
		try{
			return res.json(err.message || 'server.error');
		}catch(e){
			console.error('500 set header after sent');
		}

		
	});

	return app;
}