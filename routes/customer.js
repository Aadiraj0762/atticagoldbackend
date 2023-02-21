var express = require("express");
var router = express.Router();
const {
  login,
  verifyOtp,
  verifyToken,
} = require("../controllers/customer/auth");

router.post("/login", login);
router.post("/verify-otp", verifyOtp);

router.get("/profile", verifyToken, function (req, res) {
  res.json({ status: true, message: "Ok", data: req.user });
});

module.exports = router;
