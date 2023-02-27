const mongoose = require("mongoose");

const Sales = mongoose.model(
  "fileuploads",
  mongoose.Schema(
    {
      uploadId: {
        type: String,
        required: true,
      },
      uploadName: {
        type: String,
        required: true,
      },
      uploadType: {
        type: String,
      },
      documentType: {
        type: String,
      },
      documentNo: {
        type: String,
      },
      uploadedFile: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  )
);

module.exports = Sales;
