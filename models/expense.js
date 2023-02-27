const mongoose = require("mongoose");

const Expense = mongoose.model(
  "expenses",
  mongoose.Schema(
    {
      branchId: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
      type: {
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
    },
    { timestamps: true }
  )
);

module.exports = Expense;
