var express = require("express");
var router = express.Router();
const passport = require("passport");
const { login, getUserType } = require("../controllers/auth");

router.post("/login", login);
router.post("/get-user-type", getUserType);

module.exports = router;
