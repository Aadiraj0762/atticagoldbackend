var express = require("express");
var router = express.Router();
var authRouter = express.Router();

const passport = require("passport");
const {
  login,
  verifyLoginOtp,
  getUserType,
  getBranchUser,
} = require("../controllers/auth");

authRouter.post("/login", login);
authRouter.post("/login/verify-otp", verifyLoginOtp);
authRouter.post("/get-user-type", getUserType);
authRouter.post("/get-branch-user", getBranchUser);

module.exports = router;
