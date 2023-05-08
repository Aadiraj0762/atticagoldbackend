var express = require("express");
var router = express.Router();
var adminRouter = express.Router();
const passport = require("passport");
const dashboard = require("../controllers/admin/dashboard");
const goldRate = require("../controllers/admin/goldrate");
const branch = require("../controllers/admin/branch");
const user = require("../controllers/admin/user");
const employee = require("../controllers/admin/employee");
const fund = require("../controllers/admin/fund");
const expense = require("../controllers/admin/expense");
const profile = require("../controllers/admin/profile");
const leave = require("../controllers/admin/leave");
const attendance = require("../controllers/admin/attendance");
const sales = require("../controllers/admin/sales");
const fileUpload = require("../controllers/admin/fileupload");
const { isAdmin } = require("../middlewares/authorization");
const multer = require("../config/multer");

adminRouter.get("/", function (req, res, next) {
  res.send("Home Page");
});

adminRouter.get("/dashboard/get", dashboard.get);

adminRouter.get("/goldrate/get", goldRate.find);
adminRouter.get("/goldrate/get/:id", goldRate.findById);
adminRouter.post("/goldrate/create", goldRate.create);
adminRouter.post("/goldrate/update/:id", goldRate.update);
adminRouter.post("/goldrate/delete/:id", goldRate.remove);

adminRouter.get("/branch/get", branch.find);
adminRouter.get("/branch/get/:id", branch.findById);
adminRouter.post("/branch/create", branch.create);
adminRouter.post("/branch/update/:id", branch.update);
adminRouter.post("/branch/delete/:id", branch.remove);

adminRouter.get("/user/get", user.find);
adminRouter.get("/user/get/:id", user.findById);
adminRouter.post("/user/create", user.create);
adminRouter.post("/user/update/:id", user.update);
adminRouter.post("/user/delete/:id", user.remove);

adminRouter.get("/employee/get", employee.find);
adminRouter.get("/employee/login-not-created", employee.getLoginNotCreatedEmployee);
adminRouter.get("/employee/get/:id", employee.findById);
adminRouter.post("/employee/create", employee.create);
adminRouter.post("/employee/update/:id", employee.update);
adminRouter.post("/employee/delete/:id", employee.remove);

adminRouter.get("/expense/get", expense.find);
adminRouter.get("/expense/get/:id", expense.findById);
adminRouter.post("/expense/update/:id", expense.update);
adminRouter.post("/expense/delete/:id", expense.remove);

adminRouter.get("/fund/get", fund.find);
adminRouter.get("/fund/get/:id", fund.findById);
adminRouter.post("/fund/update/:id", fund.update);
adminRouter.post("/fund/delete/:id", fund.remove);

adminRouter.get("/attendance/get", attendance.find);
adminRouter.get("/attendance/get/:id", attendance.findById);
adminRouter.post("/attendance/update/:id", attendance.update);
adminRouter.post("/attendance/delete/:id", attendance.remove);

adminRouter.get("/sales/get", sales.find);
adminRouter.post("/sales/get", sales.find);
adminRouter.get("/sales/get/:id", sales.findById);
adminRouter.post("/sales/update/:id", sales.update);
adminRouter.post("/sales/delete/:id", sales.remove);

adminRouter.get("/leave/get", leave.find);
adminRouter.get("/leave/get/:id", leave.findById);
adminRouter.post("/leave/update/:id", leave.update);
adminRouter.post("/leave/delete/:id", leave.remove);

adminRouter.get("/file-upload/get", fileUpload.find);
adminRouter.post("/file-upload/get", fileUpload.find);
adminRouter.get("/file-upload/get/:id", fileUpload.findById);
adminRouter.post(
  "/file-upload/create",
  multer.single("uploadedFile"),
  fileUpload.create
);
adminRouter.post("/file-upload/delete/:id", fileUpload.remove);

adminRouter.get("/profile", profile.get);
adminRouter.post("/profile/change-password", profile.changePassword);

router.use(
  function (req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err || !user) {
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
  isAdmin,
  adminRouter
);

module.exports = router;
