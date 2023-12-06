var express = require("express");
var router = express.Router();

const adminController = require('../controller/adminController');

router.post("/contents", adminController.contents);
router.get("/getContents", adminController.getContents);
router.get("/getContent/:id", adminController.getContent);
router.post("/updatecontent/:id", adminController.updatecontent);

module.exports = router;