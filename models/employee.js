const mongoose = require("mongoose");

const Employee = mongoose.model("employee", {
  empid: {
    type: String,
    unique: true,
  },
  name: String,
  gender: String,
  dob: String,
  contact: String,
  addr: String,
  city: String,
  state: String,
  pincode: String,
  landmark: String,
  designation: String,
  password: String,
  branchid: String,
  date: String,
  time: String,
});

module.exports = Employee;
