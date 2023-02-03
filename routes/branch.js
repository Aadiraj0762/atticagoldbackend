var express = require("express");
var router = express.Router();
var branchRouter = express.Router();
const passport = require("passport");
const fund = require("../controllers/branch/fund");
const expense = require("../controllers/branch/expense");
const customer = require("../controllers/branch/customer");
const employee = require("../controllers/branch/employee");
const profile = require("../controllers/branch/profile");
const sales = require("../controllers/branch/sales");
const attendance = require("../controllers/branch/attendance");
const leave = require("../controllers/branch/leave");
const { isBranch } = require("../middlewares/authorization");
const multer = require("../config/multer");

branchRouter.get("/", function (req, res, next) {
  res.send("Home Page");
});

branchRouter.get("/expense/get", expense.find);
branchRouter.get("/expense/get/:id", expense.findById);
branchRouter.post("/expense/create", expense.create);
branchRouter.post("/expense/update/:id", expense.update);
branchRouter.post("/expense/delete/:id", expense.remove);

branchRouter.get("/fund/get", fund.find);
branchRouter.get("/fund/get/:id", fund.findById);
branchRouter.post("/fund/create", fund.create);
branchRouter.post("/fund/update/:id", fund.update);
branchRouter.post("/fund/delete/:id", fund.remove);

branchRouter.get("/sales/get", sales.find);
branchRouter.get("/sales/get/:id", sales.findById);
branchRouter.post("/sales/create", sales.create);
branchRouter.post("/sales/update/:id", sales.update);
branchRouter.post("/sales/delete/:id", sales.remove);

branchRouter.get("/customer/get", customer.find);
branchRouter.get("/customer/get/:id", customer.findById);
branchRouter.post("/customer/create", customer.create);
branchRouter.post("/customer/update/:id", customer.update);
branchRouter.post("/customer/delete/:id", customer.remove);

branchRouter.get("/employee/get", employee.find);
branchRouter.get("/employee/get/:id", employee.findById);
branchRouter.post("/employee/create", employee.create);
branchRouter.post("/employee/update/:id", employee.update);
branchRouter.post("/employee/delete/:id", employee.remove);

branchRouter.get("/attendance/get", attendance.find);
branchRouter.get("/attendance/get/:id", attendance.findById);
branchRouter.post(
  "/attendance/create",
  multer.single("employeePhoto"),
  attendance.create
);
branchRouter.post(
  "/attendance/update/:id",
  multer.single("employeePhoto"),
  attendance.update
);
branchRouter.post("/attendance/delete/:id", attendance.remove);

branchRouter.get("/leave/get", leave.find);
branchRouter.get("/leave/get/:id", leave.findById);
branchRouter.post("/leave/create", multer.single("proof"), leave.create);
branchRouter.post("/leave/update/:id", multer.single("proof"), leave.update);
branchRouter.post("/leave/delete/:id", leave.remove);

branchRouter.get("/profile", profile.get);
branchRouter.post("/profile/change-password", profile.changePassword);

router.use(
  function (req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: err ?? "Unauthorized",
          data: {},
        });
      }

      req.user = user;
      return next();
    })(req, res, next);
  },
  isBranch,
  branchRouter
);

module.exports = router;
