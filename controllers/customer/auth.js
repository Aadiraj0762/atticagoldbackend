const jwt = require("jsonwebtoken");
const Customer = require("../../models/customer");

function login(req, res, next) {
  return Customer.findOne({ phoneNumber: req.body.phoneNumber })
    .then((user) => {
      if (!user) {
        return res.json({
          status: false,
          message: "Incorrect phone number.",
          data: null,
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
    })
    .catch((err) => {
      return res.json({
        status: false,
        message: err.message,
        data: null,
      });
    });
}

module.exports = { login };
