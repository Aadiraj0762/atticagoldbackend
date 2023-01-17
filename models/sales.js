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
      release: mongoose.Schema({
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
          required: true,
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
        documents: [
          mongoose.Schema({
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
        ],
        bankDetail: mongoose.Schema({
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
      }),
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
          ornamentBill: {
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
        required: true,
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
        required: true,
      },
      bankAmount: {
        type: String,
        required: true,
      },
      bankDetail: mongoose.Schema({
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
      proofDocument: [
        mongoose.Schema({
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
