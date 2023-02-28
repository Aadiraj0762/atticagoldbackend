const mongoose = require("mongoose");

const User = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employees",
    },
    userType: {
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
);

module.exports = mongoose.model("users", User);
