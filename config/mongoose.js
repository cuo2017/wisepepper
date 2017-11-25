var mongoose = require('mongoose');
var config = require('./config.js');

module.exports = function(){
	var db = mongoose.connect(config.mongodb); //创建并连接数据库

	require('../app/models/user.model');
	require('../app/models/data.model');

	return db;
};