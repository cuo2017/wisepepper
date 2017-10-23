var mongoose = require('mongoose');

var User = mongoose.model('user');

module.exports = {
	getUser:function(req,res,next){
		User.find().exec(function(err, docs){
			return res.json(docs);
		});
	},
	addUser:function(req, res, next){
		var user = new User(req.body);
		user.save(function(err, docs){
			console.log('添加用户成功');
			return res.json(docs);
		});
	},
	deleteUser:function(req,res,next){
		var num = req.body;
		User.remove(num,function(err,docs){
			console.log('删除编号为'+ num.number + '的用户');
			return res.json(docs);
		});
	},
	deleteAllUser:function(req,res,next){
		User.remove(function(err,docs){
			console.log('已删除所有用户');
			return res.json(docs);
		});
	},
	updateUser:function(req,res,next){
		// $inc $set $unset
		// req.body={
		// 	num:Number,
		// 	//修改内容
			// body:{
			// 	XXX
			// }

		// }
		var number = req.body.number;
		var body = req.body.body;
		// 分开更新
		User.update({"number":number},{$set:body},function(){
			console.log("更新文字成功");
			return res.json(User);
		});
	},
	findUser:function(req,res,next){
		var content = req.body;
		User.find(content).exec(function(err,docs){
				return res.json(docs);
		});
	},



}