const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");

function login(req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        status: false,
        message: info ? info.message : "Invalid username or password.",
        data: {},
      });
    }

    // if (
    //   user.userType?.toLowerCase() === "branch" &&
    //   !user.employee.equals(req.body.employeeId)
    // ) {
    //   return res.status(400).json({
    //     status: false,
    //     message: "Invalid username or password.",
    //     data: {},
    //   });
    // }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return res.send(err);
      }

      if (user.userType?.toLowerCase() === "branch") {
        const otp = Math.floor(100000 + Math.random() * 900000);
        const token = jwt.sign(
          {
            sub: {
              user,
              otp,
            },
            iat: new Date().getTime(),
          },
          process.env.SECRET,
          { expiresIn: "1d" }
        );

        return res.json({
          status: true,
          message: "Logged in Successfully.",
          data: { token, otp },
        });
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

function verifyLoginOtp(req, res, next) {
  if (!req.body.token) {
    return res.status(400).json({
      status: false,
      message: info ? info.message : "Token is required.",
      data: {},
    });
  }
  if (!req.body.otp) {
    return res.status(400).json({
      status: false,
      message: info ? info.message : "Otp is required.",
      data: {},
    });
  }

  jwt.verify(req.body.token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res.status(400).json({
        status: false,
        message: info ? info.message : "Otp is expired.",
        data: {},
      });
    }

    const token = jwt.sign(
      {
        sub: decoded._id,
        iat: new Date().getTime(),
      },
      process.env.SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      status: true,
      message: "Logged in Successfully.",
      data: { user: decoded, token },
    });
  });
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
  User.find({ username: req.body.username }, { employee: 1 })
    .populate("employee")
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

module.exports = { login, verifyLoginOtp, getUserType, getBranchUser };
