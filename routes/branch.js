var express = require("express");
var router = express.Router();
var authRouter = express.Router();
var fundRouter = express.Router();
const passport = require("passport");
const { login } = require("../controllers/branch/auth");
const fund = require("../controllers/branch/fund");
const expense = require("../controllers/branch/expense");
const employee = require("../controllers/branch/employee");
const profile = require("../controllers/branch/profile");
const sales = require("../controllers/branch/sales");
const { isBranch } = require("../middlewares/authorization");

authRouter.post("/auth/login", login);

fundRouter.get("/", function (req, res, next) {
  res.send("Home Page");
});

fundRouter.get("/expense/get", expense.find);
fundRouter.get("/expense/get/:id", expense.findById);
fundRouter.post("/expense/create", expense.create);
fundRouter.post("/expense/update/:id", expense.update);
fundRouter.post("/expense/delete/:id", expense.remove);

fundRouter.get("/fund/get", fund.find);
fundRouter.get("/fund/get/:id", fund.findById);
fundRouter.post("/fund/create", fund.create);
fundRouter.post("/fund/update/:id", fund.update);
fundRouter.post("/fund/delete/:id", fund.remove);

fundRouter.get("/sales/get", sales.find);
fundRouter.get("/sales/get/:id", sales.findById);
fundRouter.post("/sales/create", sales.create);
fundRouter.post("/sales/update/:id", sales.update);
fundRouter.post("/sales/delete/:id", sales.remove);

fundRouter.get("/employee/get", employee.find);
fundRouter.get("/employee/get/:id", employee.findById);
fundRouter.post("/employee/create", employee.create);
fundRouter.post("/employee/update/:id", employee.update);
fundRouter.post("/employee/delete/:id", employee.remove);

fundRouter.get("/profile", profile.get);
fundRouter.post("/profile/change-password", profile.changePassword);

router.use(authRouter);
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
  fundRouter
);

module.exports = router;
