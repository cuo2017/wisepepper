var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	number : String,
	name : String,
	phone : String,
	password : String,
	auth: String,
	location : String,
	pepperNumber: String,
	img: String,
	date: String,
});

var user = mongoose.model("user",userSchema);