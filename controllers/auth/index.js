const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

function login(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: info ? info.message : "Invalid username or password.",
        data: {},
      });
    }

    if (
      user?.userType?.toLowerCase() != "admin" &&
      user?.employeeId !== req.body.employeeId
    ) {
      return res.status(400).json({
        status: false,
        message: "Invalid username or password.",
        data: {},
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.send(err);
      }

      const token = jwt.sign(
        {
          sub: user._id,
          iat: new Date().getTime(),
        },
        process.env.SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        status: true,
        message: "Logged in Successfully.",
        data: { user, token },
      });
    });
  })(req, res, next);
}

function getUserType(req, res, next) {
  User.findOne({ username: req.body.username })
    .then(function (user) {
      return res.json({
        status: true,
        message: "",
        data: {
          userType: user.userType,
        },
      });
    })
    .catch(function (err) {
      return res.json({
        status: false,
        message: "Invalid username",
        data: [],
      });
    });
}

function getBranchUser(req, res, next) {
  User.find({ username: req.body.username }, { employeeId: 1 })
    .then(function (data) {
      return res.json({
        status: true,
        message: "",
        data: data,
      });
    })
    .catch(function (err) {
      return res.json({
        status: false,
        message: "Invalid username",
        data: [],
      });
    });
}

module.exports = { login, getUserType, getBranchUser };
