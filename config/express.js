var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');

module.exports = function(){
	var app =	express();
	app.use(bodyParser.json({limit: "50mb"}));
	app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));// base64太大，改变post大小 

	app.use(express.static("public"));

	require('../app/routes/user.route.js')(app);
	require('../app/routes/data.route.js')(app);

	// 定时保存环境信息

	var period = 1000*1;
	function saveData(){
		var exec = require('child_process').exec;
		var cmdStr = "curl localhost:8080/saveData";
		exec(cmdStr,function(err,stdout,stderr){
			if(err){
				console.log('save weather api error:'+stderr);
			}
			else{
				var date = new Date();
				date = moment(date).format('LLL');
				console.log(date + " 成功保存环境数据");
			}
		});
	}
	var myInterval = setInterval(saveData, 1000, "Interval");
	function  myfunc(Interval){
    	console.log("myfunc  "+Interval);
	}

	function  stopInterval(){
	    clearTimeout(myInterval);
	 //myInterval.unref();
	}
	setTimeout(stopInterval,900);
	


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