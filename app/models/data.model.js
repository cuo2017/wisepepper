var mongoose = require('mongoose');

// 每日一次存数据
var dataSchema = mongoose.Schema({
	date: String,
	at: String,
	ah: String,
	st: String,
	sh: String,
	warning: String,
	degree: String,
});

var data = mongoose.model("data",dataSchema);