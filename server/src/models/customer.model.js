const mongoose = require("mongoose");

const customerSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        unique: true,
        sparse: true,
      },

      email: {
        type: String,
        trim: true,
        default: undefined,
      },

      profilePic: {
        type: String,
        default:
          "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
      },

      dob: Date,

      anniversary: Date,

      address: {
        type: String,
      },

      role: {
        type: String,
        enum: [
          "customer",
          "student",
        ],
        default:
          "customer",
      },

      category: {
        type: String,
        enum: [
          "premium",
          "middle",
          "economy",
        ],
        default:
          "middle",
      },

      notes: String,

      status: {
        type: String,
        enum: [
          "active",
          "inactive",
        ],
        default:
          "active",
      },

      createdBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },

      visitCount: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

// EMAIL UNIQUE ONLY IF EXISTS

customerSchema.index(
  { email: 1 },
  {
    unique: true,
    sparse: true,
  }
);

module.exports =
  mongoose.model(
    "Customer",
    customerSchema
  );