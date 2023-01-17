const mongoose = require("mongoose");

const Employee = mongoose.model("employees", {
  employeeId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  alternatePhoneNumber: {
    type: String,
  },
  profileImage: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  proofDocument: {
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
  },
  address: [
    mongoose.Schema({
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
      residential: {
        type: String,
        required: true,
      },
      addressProof: {
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
      },
      createdAt: {
        type: Date,
        required: true,
      },
      updatedAt: {
        type: Date,
      },
    }),
  ],
  status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = Employee;
