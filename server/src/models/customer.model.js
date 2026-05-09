const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      unique: true,
    },

    profilePic: {
      type: String,

      default:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },

    dob: Date,

    anniversary: Date,

    role: {
      type: String,

      enum: [
        "customer",
        "student",
      ],

      default: "customer",
    },

    category: {
      type: String,

      enum: [
        "premium",
        "middle",
        "economy",
      ],

      default: "middle",
    },

    notes: String,

    visitCount: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model(
  "Customer",
  customerSchema
);