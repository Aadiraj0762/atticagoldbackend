var express = require("express");
var router = express.Router();
var hrRouter = express.Router();
const passport = require("passport");
const branch = require("../controllers/hr/branch");
const user = require("../controllers/hr/user");
const employee = require("../controllers/hr/employee");
const profile = require("../controllers/hr/profile");
const leave = require("../controllers/hr/leave");
const attendance = require("../controllers/hr/attendance");
const { isHr } = require("../middlewares/authorization");
const multer = require("../config/multer");

hrRouter.get("/", function (req, res, next) {
  res.send("Home Page");
});

hrRouter.get("/branch/get", branch.find);
hrRouter.get("/branch/get/:id", branch.findById);
hrRouter.post("/branch/create", branch.create);
hrRouter.post("/branch/update/:id", branch.update);
hrRouter.post("/branch/delete/:id", branch.remove);

hrRouter.get("/user/get", user.find);
hrRouter.get("/user/get/:id", user.findById);
hrRouter.post("/user/create", user.create);
hrRouter.post("/user/update/:id", user.update);
hrRouter.post("/user/delete/:id", user.remove);

hrRouter.get("/employee/get", employee.find);
hrRouter.get("/employee/get/:id", employee.findById);
hrRouter.post("/employee/create", employee.create);
hrRouter.post("/employee/update/:id", employee.update);
hrRouter.post("/employee/delete/:id", employee.remove);

hrRouter.get("/attendance/get", attendance.find);
hrRouter.get("/attendance/get/:id", attendance.findById);
hrRouter.post("/attendance/update/:id", attendance.update);
hrRouter.post("/attendance/delete/:id", attendance.remove);

hrRouter.get("/leave/get", leave.find);
hrRouter.get("/leave/get/:id", leave.findById);
hrRouter.post("/leave/update/:id", multer.single("proof"), leave.update);
hrRouter.post("/leave/delete/:id", leave.remove);

hrRouter.get("/profile", profile.get);
hrRouter.post("/profile/change-password", profile.changePassword);

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
  isHr,
  hrRouter
);

module.exports = router;
