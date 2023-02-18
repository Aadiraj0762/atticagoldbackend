const mongoose = require("mongoose");

const Sales = mongoose.model(
  "sales",
  mongoose.Schema(
    {
      employeeId: {
        type: String,
        required: true,
      },
      customerId: {
        type: String,
        required: true,
      },
      branchId: {
        type: String,
        required: true,
      },
      saleType: {
        type: String,
        required: true,
      },
      releaseId: [
        {
          type: String,
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
        type: String,
      },
      bankAmount: {
        type: String,
      },
      proofDocument: [
        mongoose.Schema({
          documentType: {
            type: String,
            required: true,
          },
          documentNo: {
            type: String,
          },
          documentFile: {
            type: String,
            required: true,
          },
        }),
      ],
      status: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Sales;
