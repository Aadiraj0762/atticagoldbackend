var express = require("express");
var router = express.Router();
const passport = require("passport");
const auth = require("../controllers/admin/login");

router.post("/auth/login", auth.login);

router.get("/", function (req, res, next) {
  res.send("Home Page");
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    res.json(req.user);
  }
);
module.exports = router;
