const mongoose = require("mongoose");

const User = mongoose.model("user", {
  username: String,
  password: String,
  status: String,
  type: String,
  date: String,
  time: String,
});

module.exports = User;
