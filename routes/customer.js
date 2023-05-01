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
const branch = require("../controllers/customer/branch");
const sales = require("../controllers/customer/sales");

router.post("/login", login);
router.post("/verify-otp", verifyOtp);

customerRouter.post("/goldrate", goldRate.latest);

customerRouter.get("/branch/get", branch.find);
customerRouter.get("/branch/get/:id", branch.findById);
customerRouter.post("/branch/find", branch.findOne);

customerRouter.get("/sales/get", sales.find);
customerRouter.get("/sales/get/:id", sales.findById);
customerRouter.post("/sales/create", sales.create);
customerRouter.post("/sales/update/:id", sales.update);
customerRouter.post("/sales/delete/:id", sales.remove);

customerRouter.get("/profile", profile.get);
customerRouter.post("/profile", profile.update);

router.use(verifyToken, customerRouter);

module.exports = router;
