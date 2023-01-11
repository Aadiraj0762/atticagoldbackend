var express = require("express");
var router = express.Router();
var authRouter = express.Router();
var adminRouter = express.Router();
const passport = require("passport");
const { login } = require("../controllers/super-admin/auth");
const goldRate = require("../controllers/super-admin/goldrate");
const branch = require("../controllers/super-admin/branch");
const user = require("../controllers/super-admin/user");
const employee = require("../controllers/super-admin/employee");
const { isSuperAdmin } = require("../middlewares/authorization");

authRouter.post("/auth/login", login);

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

adminRouter.get("/profile", function (req, res) {
  res.json({
    status: true,
    message: "",
    data: req.user,
  });
});

router.use(authRouter);
router.use(
  function (req, res, next) {
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(400).json({
          status: false,
          message: err,
          data: {},
        });
      }
      if (!user) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized",
          data: {},
        });
      }

      req.user = user;
      return next();
    })(req, res, next);
  },
  isSuperAdmin,
  adminRouter
);

module.exports = router;
