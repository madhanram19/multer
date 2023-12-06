var express = require("express");
var router = express.Router();
const loginController = require('../controller/loginController');

router.post ('/loginUser', loginController.loginUser);


module.exports = router;