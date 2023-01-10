const passport = require("passport");
const jwt = require("jsonwebtoken");

module.exports.login = function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
          password: user.password,
        },
        process.env.SECRET
      );

      return res.json({ user, token });
    });
  })(req, res, next);
};
