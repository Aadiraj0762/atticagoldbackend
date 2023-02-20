const mongoose = require("mongoose");

const Customer = mongoose.model(
  "customers",
  mongoose.Schema(
    {
      customerId: {
        type: String,
        unique: true,
        default: function () {
          return `BGC${this.customerIdSeq.toString().padStart(3, "0")}`;
        },
      },
      customerIdSeq: {
        type: Number,
        unique: true,
      },
      email: {
        type: String,
        required: true,
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
      maritalStatus: {
        type: String,
        required: true,
      },
      employment: mongoose.Schema({
        employmentType: {
          type: String,
          required: true,
        },
        organisation: {
          type: String,
          required: true,
        },
        annualIncome: {
          type: String,
          required: true,
        },
      }),
      documentId: mongoose.Schema({
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
      }),
      signature: {
        type: String,
        required: true,
      },
      otp: {
        type: String,
        required: true,
      },
      address: [
        mongoose.Schema(
          {
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
            label: {
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
          },
          { timestamps: true }
        ),
      ],
      bank: [
        mongoose.Schema({
          accountNo: {
            type: String,
            required: true,
          },
          accountHolderName: {
            type: String,
            required: true,
          },
          ifscCode: {
            type: String,
            required: true,
          },
          bankName: {
            type: String,
            required: true,
          },
          branch: {
            type: String,
            required: true,
          },
          proofType: {
            type: String,
            required: true,
          },
          proofFile: {
            type: String,
            required: true,
          },
        }),
      ],
      source: {
        type: String,
        required: true,
      },
      label: {
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

module.exports = Customer;
