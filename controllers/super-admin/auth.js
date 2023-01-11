const passport = require("passport");
const jwt = require("jsonwebtoken");

function login(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        status: false,
        message: info ? info.message : "Login failed.",
        data: {},
      });
    }

    if (user.type.toLowerCase() !== "super-admin") {
      return res.status(400).json({
        status: false,
        message: "You are not allowed to login.",
        data: {},
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(
        {
          sub: user._id,
          iat: new Date().getTime(),
          exp: new Date().setDate(new Date().getDate() + 1),
        },
        process.env.SECRET
      );

      return res.json({
        status: true,
        message: "Logged in Successfully.",
        data: { user, token },
      });
    });
  })(req, res, next);
}

module.exports = { login };
