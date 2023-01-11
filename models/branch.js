const mongoose = require("mongoose");

const Branch = mongoose.model("branch", {
  branchid: {
    type: String,
    unique: true,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  addr: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = Branch;
