var express = require("express");
var router = express.Router();
var customerRouter = express.Router();
const {
  login,
  verifyOtp,
  verifyToken,
} = require("../controllers/customer/auth");
const profile = require("../controllers/customer/profile");
const goldRate = require("../controllers/customer/goldrate");

router.post("/login", login);
router.post("/verify-otp", verifyOtp);

customerRouter.post("/goldrate", goldRate.findOne);

customerRouter.get("/profile", profile.get);
customerRouter.post("/profile", profile.update);

router.use(verifyToken, customerRouter);

module.exports = router;
