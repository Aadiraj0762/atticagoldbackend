var express = require("express");
var router = express.Router();
var authRouter = express.Router();
var accountsRouter = express.Router();
const passport = require("passport");
const { login } = require("../controllers/accounts/auth");
const goldRate = require("../controllers/accounts/goldrate");
const branch = require("../controllers/accounts/branch");
const expense = require("../controllers/accounts/expense");
const profile = require("../controllers/accounts/profile");
const { isAccounts } = require("../middlewares/authorization");

authRouter.post("/auth/login", login);

accountsRouter.get("/", function (req, res, next) {
  res.send("Home Page");
});

accountsRouter.get("/goldrate/get", goldRate.find);
accountsRouter.get("/goldrate/get/:id", goldRate.findById);
accountsRouter.post("/goldrate/create", goldRate.create);
accountsRouter.post("/goldrate/update/:id", goldRate.update);
accountsRouter.post("/goldrate/delete/:id", goldRate.remove);

accountsRouter.get("/branch/get", branch.find);
accountsRouter.get("/branch/get/:id", branch.findById);

accountsRouter.get("/expense/get", expense.find);
accountsRouter.get("/expense/get/:id", expense.findById);
accountsRouter.post("/expense/create", expense.create);
accountsRouter.post("/expense/update/:id", expense.update);
accountsRouter.post("/expense/delete/:id", expense.remove);

accountsRouter.get("/profile", profile.get);
accountsRouter.post("/profile/change-password", profile.changePassword);

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
  isAccounts,
  accountsRouter
);

module.exports = router;
