const mongoose = require("mongoose");

const Payprocess = mongoose.model(
  "payprocess",
  mongoose.Schema(
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
      note: {
        type: String,
      },
      loggedUsername: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
        default: "active",
      },
    },
    { timestamps: true }
  )
);

module.exports = Payprocess;
