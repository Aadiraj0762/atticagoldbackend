const mongoose = require("mongoose");

const BillItem = mongoose.model("billitem", {
  ornaments: {
    type: String,
    required: true,
  },
  count: {
    type: String,
    required: true,
  },
  grossweight: {
    type: String,
    required: true,
  },
  stone: {
    type: String,
    required: true,
  },
  netWeight: {
    type: String,
    required: true,
  },
  purity: {
    type: String,
    required: true,
  },
  billid: {
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

module.exports = BillItem;
