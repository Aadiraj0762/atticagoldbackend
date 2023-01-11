const mongoose = require("mongoose");

const FundTransfer = mongoose.model("fundTransfer", {
  fromWhom: String,
  toWhom: String,
  amount: String,
  status: String,
  date: String,
  time: String,
});

module.exports = FundTransfer;
