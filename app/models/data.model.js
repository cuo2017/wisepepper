var mongoose = require('mongoose');

// 每日一次存数据
var dataSchema = mongoose.Schema({
	name: String,
	date: String,
	data: {
		airTem: String,
		airHum: String,
		soilTem: String,
		soilHum: String,
	},
	warning: String,
	degree: String,
});

var data = mongoose.model("data",dataSchema);