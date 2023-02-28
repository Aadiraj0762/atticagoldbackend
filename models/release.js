const mongoose = require("mongoose");

const Release = mongoose.model(
  "releases",
  mongoose.Schema(
    {
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers",
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
      bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customers.bank",
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
      releaseDate: {
        type: Date,
        required: true,
      },
      comments: {
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
