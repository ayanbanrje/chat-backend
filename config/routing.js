module.exports = function(app) {
    app.get('/', function(req, res) {
        res.json({
            status: 'SUCCESS',
            message : "Server is up !!"
        })
    });

    var userController = require("../controllers/userController");
    app
       .post("/user/saveuser",userController.saveUser)
       .post("/user/login",userController.login)
       .get('*', function(req, res){
		   res.status(404).send("Sorry can't find that!")
		});

};