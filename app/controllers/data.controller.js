var mongoose = require('mongoose');
var http = require('http');
var cheerio = require('cheerio');
//爬虫

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
		var cmdStr = "python ./data/sys1/t1.py";
		// 获取sys1里面的灾害预报
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
				switch (result[1]) {
					case 'a':
						report.degree = '轻微';
						break;
					case 'b':
						report.degree = '中等';
						break;
					case 'c':
						report.degree = '严重';
						break;
				};
				
				return res.json(report);
			}
			
		});
	},



	// data mining

	getDataByWeb: function(req,res,next){
		
		// 爬虫爬取温度
		var url = 'http://www.nmc.cn/publish/forecast/ASC/san-tai.html';
		var listData  = [];//wd
		var listData2 = [];//sd
		var data = {
			wd: String,
			sd: String,
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


			        data.wd = (parseInt(listData[1].wd) + parseInt(listData[3].wd) + parseInt(listData[5].wd) + parseInt(listData[7].wd) )/4;
			        data.sd = (parseInt(listData2[1].sd) + parseInt(listData2[3].sd) + parseInt(listData2[5].sd) + parseInt(listData2[7].sd) )/4;

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







}