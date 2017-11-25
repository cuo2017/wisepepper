var dataController = require('../controllers/data.controller');

module.exports =function(app){
	app.route('/getData')
	.get(dataController.getData);

	app.route('/addData')
	.post(dataController.addData);

	app.route('/deleteData')
	.post(dataController.deleteData);


	app.route('/deleteAllData')
	.get(dataController.deleteAllData);


};
