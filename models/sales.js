const mongoose = require("mongoose");

const Sales = mongoose.model(
  "sales",
  mongoose.Schema(
    {
      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees",
        required: true,
      },
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
        required: true,
      },
      branchId: {
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
      releaseId: [
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
      bankId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers.bank",
      },
      bankAmount: {
        type: String,
      },
      status: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Sales;
