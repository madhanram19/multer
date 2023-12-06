var express = require("express");
var router = express.Router();
const forgetController = require('../controller/forgotController');

// router.post("/forgetPassword" ,forgetController.forgetPassword)

router.post('/test', forgetController.forgetPassword)

// router.post("/setNewPassword", forgetController.setNewPassword)
// router.post("/forgetPasswordverifyOtp", forgetController.forgetPasswordverifyOtp)

module.exports = router;

