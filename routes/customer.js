var express = require("express");
var router = express.Router();
var authRoutes = express.Router();
const {
  login,
  verifyOtp,
  verifyToken,
} = require("../controllers/customer/auth");
const profile = require("../controllers/customer/profile");

router.post("/login", login);
router.post("/verify-otp", verifyOtp);

authRoutes.get("/profile", profile.get);
authRoutes.post("/profile", profile.update);

router.use(verifyToken, authRoutes);

module.exports = router;
