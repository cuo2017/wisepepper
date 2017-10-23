//环境变量以及各端口等配置
var config = null;
//读取环境变量
if(process && process.env && process.env.NODE_ENV){
	config  = require('./env/' + process.env.NODE_ENV + '.js');
}else{
	config = require('./env/dev.js');
}


module.exports = config;