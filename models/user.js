const mongoose = require("mongoose");

const User = mongoose.model(
  "users",
  mongoose.Schema(
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
      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
        unique: true,
      },
      userType: {
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

module.exports = User;
