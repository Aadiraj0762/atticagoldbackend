var express = require("express");
var router = express.Router();
var adminRouter = express.Router();
const passport = require("passport");
const goldRate = require("../controllers/admin/goldrate");
const branch = require("../controllers/admin/branch");
const user = require("../controllers/admin/user");
const employee = require("../controllers/admin/employee");
const fund = require("../controllers/admin/fund");
const expense = require("../controllers/admin/expense");
const profile = require("../controllers/admin/profile");
const { isAdmin } = require("../middlewares/authorization");

adminRouter.get("/", function (req, res, next) {
  res.send("Home Page");
});

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
