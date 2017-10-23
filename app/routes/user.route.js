var userController = require('../controllers/user.controller');

module.exports =function(app){
	app.route('/getUser')
	.get(userController.getUser);

	app.route('/addUser')
	.post(userController.addUser);

	app.route('/deleteUser')
	.post(userController.deleteUser);

	app.route('/updateUser')
	.post(userController.updateUser);

	app.route('/deleteAllUser')
	.get(userController.deleteAllUser);

	app.route('/findUser')
	.post(userController.findUser);
};