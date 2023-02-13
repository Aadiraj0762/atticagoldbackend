const mongoose = require("mongoose");

const Release = mongoose.model(
  "releases",
  mongoose.Schema(
    {
      customerId: {
        type: String,
        required: true,
      },
      weight: {
        type: String,
        required: true,
      },
      pledgeAmount: {
        type: String,
        required: true,
      },
      payableAmount: {
        type: String,
        required: true,
      },
      paymentType: {
        type: String,
        required: true,
      },
      bankId: {
        type: String,
      },
      pledgedDate: {
        type: Date,
        required: true,
      },
      pledgedIn: {
        type: String,
        required: true,
      },
      branch: {
        type: String,
        required: true,
      },
      pledgeId: {
        type: String,
      },
      releaseDocument: {
        type: String,
        required: true,
      },
      releaseDate: {
        type: Date,
        required: true,
      },
      comments: {
        type: String,
        required: true,
      },
      documentType: {
        type: String,
        required: true,
      },
      documentNo: {
        type: String,
        required: true,
      },
      documentFile: {
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

module.exports = Release;
