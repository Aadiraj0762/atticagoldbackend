const mongoose = require("mongoose");

const Sales = mongoose.model(
  "sales",
  mongoose.Schema(
    {
      employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
        required: true,
      },
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
        required: true,
      },
      branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branches",
        required: true,
      },
      saleType: {
        type: String,
        required: true,
      },
      ornamentType: {
        type: String,
        required: true,
      },
      release: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "releases",
        },
      ],
      ornaments: [
        mongoose.Schema({
          ornamentType: {
            type: String,
            required: true,
          },
          quantity: {
            type: String,
            required: true,
          },
          grossWeight: {
            type: String,
            required: true,
          },
          stoneWeight: {
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
          netAmount: {
            type: String,
            required: true,
          },
        }),
      ],
      dop: {
        type: String,
        required: true,
      },
      goldRate: {
        type: String,
      },
      silverRate: {
        type: String,
      },
      netWeight: {
        type: String,
        required: true,
      },
      netAmount: {
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
      payableAmount: {
        type: String,
        required: true,
      },
      cashAmount: {
        type: String,
      },
      bank: {
        type: mongoose.Schema.Types.ObjectId,
      },
      bankAmount: {
        type: String,
      },
      status: {
        type: String,
        required: true,
        default: "pending",
      },
    },
    { timestamps: true }
  )
);

module.exports = Sales;
