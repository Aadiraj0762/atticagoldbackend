const mongoose = require("mongoose");

const Branch = mongoose.model(
  "branches",
  mongoose.Schema(
    {
      branchId: {
        type: String,
        unique: true,
        required: true,
      },
      branchName: {
        type: String,
        required: true,
      },
      address: {
        address: {
          type: String,
          required: true,
        },
        area: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        pincode: {
          type: String,
          required: true,
        },
        landmark: {
          type: String,
          required: true,
        },
        latitude: {
          type: String,
          required: true,
        },
        longitude: {
          type: String,
          required: true,
        },
      },
      status: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Branch;
