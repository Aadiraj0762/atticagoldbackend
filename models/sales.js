const mongoose = require("mongoose");

const Sales = mongoose.model("sales", {
  empId: {
    type: String,
    required: true,
  },
  cusid: {
    type: String,
    required: true,
  },
  branchid: {
    type: String,
    required: true,
  },
  saletype: {
    type: String,
    required: true,
  },
  releaseid: {
    type: String,
    required: true,
  },
  dop: {
    type: String,
    required: true,
  },
  uploadbill: {
    type: String,
    required: true,
  },
  gold_rate: {
    type: String,
    required: true,
  },
  netweight: {
    type: String,
    required: true,
  },
  netamount: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    required: true,
  },
  margin: {
    type: String,
    required: true,
  },
  paidamount: {
    type: String,
    required: true,
  },
  cashamount: {
    type: String,
    required: true,
  },
  bankamount: {
    type: String,
    required: true,
  },
  status: {
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

module.exports = Sales;
