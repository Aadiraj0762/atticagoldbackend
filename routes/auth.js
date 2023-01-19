var express = require("express");
var router = express.Router();
const passport = require("passport");
const { login, getUserType, getBranchUser } = require("../controllers/auth");

router.post("/login", login);
router.post("/get-user-type", getUserType);
router.post("/get-branch-user", getBranchUser);

module.exports = router;
