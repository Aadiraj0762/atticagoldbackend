var express = require("express");
var router = express.Router();
const { login } = require("../controllers/customer/auth");

router.post("/login", login);

module.exports = router;
