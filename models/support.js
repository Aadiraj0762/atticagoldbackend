const mongoose = require("mongoose");

const Support = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
    },
    issue: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reply: [
      mongoose.Schema(
        {
          from: {
            type: String,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
        },
        { timestamps: true }
      ),
    ],
    status: {
      type: String,
      required: true,
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("supports", Support);
