const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Employee = require("../../models/employee");

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
        const otp = String(
          Math.floor(100000 + Math.random() * 900000)
        ).substring(0, 6);
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
      message: "Token is required.",
      data: {},
    });
  }
  if (!req.body.otp) {
    return res.status(400).json({
      status: false,
      message: "Otp is required.",
      data: {},
    });
  }

  jwt.verify(req.body.token, process.env.SECRET, function (err, decoded) {
    const data = decoded.sub;
    if (err) {
      return res.status(400).json({
        status: false,
        message: "Otp is expired.",
        data: {},
      });
    }

    if (String(data.otp) !== String(req.body.otp)) {
      return res.status(400).json({
        status: false,
        message: "Invalid otp.",
        data: {},
      });
    }

    const token = jwt.sign(
      {
        sub: data.user._id,
        iat: new Date().getTime(),
      },
      process.env.SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      status: true,
      message: "Logged in Successfully.",
      data: { user: data.user, token },
    });
  });
}

function getUserType(req, res, next) {
  User.findOne({ username: req.body.username })
    .then(async function (user) {
      if (!user) {
        const employee = await Employee.findOne({
          phoneNumber: req.body.username,
        }).exec();

        if (!employee) {
          return res.json({
            status: false,
            message: "Invalid username",
            data: [],
          });
        }

        const employeeUser = await User.findOne(
          {
            employee: employee._id,
          },
          { password: 0 }
        ).exec();

        if (!employeeUser) {
          return res.json({
            status: false,
            message: "Invalid username",
            data: [],
          });
        }

        return res.json({
          status: true,
          message: "",
          data: {
            userType: employeeUser.userType,
          },
        });
      }
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
