var dataController = require('../controllers/data.controller');

module.exports =function(app){
	// 存取data
	app.route('/getData')
	.get(dataController.getData);

	app.route('/addData')
	.post(dataController.addData);

	app.route('/deleteData')
	.post(dataController.deleteData);


	app.route('/deleteAllData')
	.get(dataController.deleteAllData);

	// 处理data
	app.route('/getDataBySys1')
	.get(dataController.getDataBySys1);


	// 爬取data
	app.route('/getDataByWeb')
	.get(dataController.getDataByWeb); 

	// 获取weather数据
	app.route('/getWeaByWeb')
	.get(dataController.getWeaByWeb);
};
