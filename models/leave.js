const mongoose = require("mongoose");

const Leave = mongoose.model("leaves", {
  empid: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  dates: {
    type: String,
    required: true,
  },
  proof: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  branchid: {
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

module.exports = Leave;
