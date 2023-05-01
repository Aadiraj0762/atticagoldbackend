const mongoose = require("mongoose");

const SupportReply = mongoose.Schema(
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
);

module.exports = mongoose.model("support_reply", SupportReply);
