const mongoose = require("mongoose");

const Expense = mongoose.model("expense", {
  amount: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  upload: {
    type: String,
    required: true,
  },
  branch: {
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
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = Expense;
