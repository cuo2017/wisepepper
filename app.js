// 建立以及初始化数据库与web服务
var mongodb = require('./config/mongoose');
var express = require('./config/express');//调用config目录下的关于数据库以及网络搭建的脚本

var db = mongodb(); //使用配置文件连接的数据库 
var app = express();

module.exports = app;