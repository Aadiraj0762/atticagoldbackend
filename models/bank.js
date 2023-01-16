const mongoose = require("mongoose");

const Bank = mongoose.model("bank", {
  cusid: {
    type: String,
    required: true,
  },
  accno: {
    type: String,
    required: true,
  },
  accname: {
    type: String,
    required: true,
  },
  ifsccode: {
    type: String,
    required: true,
  },
  bank: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  prooftype: {
    type: String,
    required: true,
  },
  proofupload: {
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

module.exports = Bank;
