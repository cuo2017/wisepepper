var mongoose = require('mongoose');
var http = require('http');
var cheerio = require('cheerio');
//爬虫
var request = require('request');
var moment = require('moment');

var User = mongoose.model('user');

var Data = mongoose.model('data');



module.exports = {
	// 存取data
	getData:function(req,res,next){
		Data.find().exec(function(err, docs){
			return res.json(docs);
		});
	},
	addData:function(req,res,next){
		var data = new Data(req.body);
		Data.save(function(err,docs){
			console.log('添加天气数据成功');
			return res.json(docs);
		});
	},
	deleteData:function(req,res,next){
		var condition = req.body;//名字加日期
		Data.remove(condition,function(err,docs){
			console.log('删除姓名为' + condition.name + "、日期为" + condition.date + "的天气数据");
			return res.json(docs);
		});
	},
	deleteAllData: function(req,res,next){
		Data.remove(function(err,docs){
			console.log('已删除所有天气数据');
			return res.json(docs);
		});
	},
	

	// 处理data

	getDataBySys1: function(req,res,next){
		var exec = require('child_process').exec;
		var cmdStr = "python ./data/sys2/similar_new.py";
		// 获取sys2里面的灾害预报
		exec(cmdStr,function(err,stdout,stderr){
			if(err){
				console.log('get weather api error:'+stderr);
			}else{
				console.log(stdout);
				var result = stdout;
				var report = {
					type: String,
					degree: String,
				};
				switch (result[0]) {
					case '0':
						report.type = '0';
						break;
					case '1':
						report.type = '干旱';
						break;
					case '2':
						report.type = '冻害';
						break;
					case '3':
						report.type = '锈病';
						break;
					case '4':
						report.type = '虫害';
						break;
				};
				// switch (result[1]) {
				// 	case 'a':
				// 		report.degree = '轻微';
				// 		break;
				// 	case 'b':
				// 		report.degree = '中等';
				// 		break;
				// 	case 'c':
				// 		report.degree = '严重';
				// 		break;
				// };
				var i = 3;
				var degree = 0;
				for(i;i<6;i++){
					var b = result[i].toString();
					degree += b;
				}
				degree *=100;
				report.degree = degree + "%";
				return res.json(report);
			}
			
		});
	},



	// data mining including Review

	getDataByWeb: function(req,res,next){
		
		// 爬虫爬取温度
		var url = 'http://www.nmc.cn/publish/forecast/ASC/san-tai.html';
		var listData  = [];//wd
		var listData2 = [];//sd
		var data = {
			wd: String,
			sd: String,
			at: String,
        	st: String,
        	ah: String,
        	sh: String,
		}
		http.get(url, function(response) {
		    var html = '';
		    // 获取页面数据
		    response.on('data', function(data) {
		        html += data;
		    });
		    // 数据获取结束
		    response.on('end', function() {
		        // 通过过滤页面信息获取实际需求的轮播图信息
			    
		        if (html) {
			        // 沿用JQuery风格，定义$
			        var $ = cheerio.load(html);
			        var list = $('#day0');

			        list.find('#day0 .wd div').each(function(item) {

			            var wd = $(this).text();
			            listData.push({
			                wd : wd,
			            });
			        });

			        list.find('#day0 .xdsd div').each(function(item) {

			            var sd = $(this).text();
			            listData2.push({
			                sd : sd,
			            });
			        });

			        console.log(listData[1].wd);

			        data.wd = (parseFloat(listData[1].wd) + parseFloat(listData[3].wd) + parseFloat(listData[5].wd) + parseFloat(listData[7].wd) )/4;
			        data.sd = (parseFloat(listData2[1].sd) + parseFloat(listData2[3].sd) + parseFloat(listData2[5].sd) + parseFloat(listData2[7].sd) )/4;

			        data.wd = data.wd.toFixed(2);
			        data.sd = data.sd.toFixed(2);


			        if(data.wd > 15 && data.wd < 25){
			        	data.at = "2";
			        }
			        else if(data.wd > 25 && data.wd < 30 || data.wd > 10 && data.wd < 15){
			        	data.at = "1";
			        }
			        else if(data.wd > 30 || data.wd < 10){
			        	data.at = "0";
			        }


			        if(data.sd > 60 && data.sd < 90){
			        	data.ah = "2";
			        }
			        else if(data.sd > 90 && data.sd < 101 || data.sd > 40 && data.sd < 60){
			        	data.ah = "1";
			        }
			        else if(data.sd < 40){
			        	data.ah = "0";
			        }

			        data.st = "2";
			        data.sh = "2";



			        return res.json(data);


			    }else{
			        console.log('无数据传入！');
			    }
		        
		    });
		}).on('error', function() {
		    console.log('获取数据出错！');
		});

		
        
		// return res.json(listData);

	},

	


	getWeaByWeb:function(req,res,next){


		// ###搞不明白为什么没法获取数据
		// var url = 'http://www.sojson.com/open/api/weather/json.shtml?city=三台';
		// request({
		//     url: url,
		//     json: true
		// }, function (error, response, body) {

		//     if (!error && response.statusCode === 200) {
		//         console.log('cyh' + body); // Print the json response

		//     }
		//     else{
		//     	console.log(error);
		//     }
		// })


		// ###子进程直接curl获取
		var exec = require('child_process').exec;
		var cmdStr = 'curl http://www.sojson.com/open/api/weather/json.shtml?city=三台';
		exec(cmdStr,function(err,stdout,stderr){
           	return res.json(stdout);

		});

	},

	// 存储环境信息数据

	saveData:function(req,res,next){
		var url = 'http://www.nmc.cn/publish/forecast/ASC/san-tai.html';
		var listData  = [];//wd
		var listData2 = [];//sd
		var data = {
			date: String,
			at: String,
			ah: String,
			st: String,
			sh: String,
			warning: String,
			degree: String,
		};
		http.get(url, function(response) {
		    var html = '';
		    // 获取页面数据
		    response.on('data', function(data) {
		        html += data;
		    });
		    // 数据获取结束
		    response.on('end', function() {
		        // 通过过滤页面信息获取实际需求的轮播图信息
			    
		        if (html) {
			        // 沿用JQuery风格，定义$
			        var $ = cheerio.load(html);
			        var list = $('#day0');

			        list.find('#day0 .wd div').each(function(item) {

			            var wd = $(this).text();
			            listData.push({
			                wd : wd,
			            });
			        });

			        list.find('#day0 .xdsd div').each(function(item) {

			            var sd = $(this).text();
			            listData2.push({
			                sd : sd,
			            });
			        });

			        // console.log(listData[1].wd);

			        data.at = (parseFloat(listData[1].wd) + parseFloat(listData[3].wd) + parseFloat(listData[5].wd) + parseFloat(listData[7].wd) )/4;
			        data.ah = (parseFloat(listData2[1].sd) + parseFloat(listData2[3].sd) + parseFloat(listData2[5].sd) + parseFloat(listData2[7].sd) )/4;

			        data.at = data.at.toFixed(2);
			        data.ah = data.ah.toFixed(2);
			        data.st = "-";
			        data.sh = "-";
			        var myDate = new Date();
			        data.date = moment(myDate).subtract(10, 'days').calendar();
			        data.warning = "-";
			        data.degree = "-";

			        
			        

			        console.log(data);
			        var data1 = new Data(data);
			        data1.save(function(err,docs){
			        	console.log("添加环境数据成功");
			        });



			        return res.json(data);


			    }else{
			        console.log('无数据传入！');
			    }
		        
		    });
		}).on('error', function() {
		    console.log('获取数据出错！');
		});

		

	},







}