var mongoose = require('mongoose');

var User = mongoose.model('user');
var Data = mongoose.model('data');

module.exports = {
	
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
	



}