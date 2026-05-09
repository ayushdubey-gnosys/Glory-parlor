const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    mobile: {
      type: String,
      unique: true,
    },

    password: String,

    profilePic: {
      type: String,

      default:
        "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
    },

    role: {
      type: String,

      enum: [
        "superadmin",
        "admin",
        "staff",
        "customer",
      ],

      default: "customer",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model(
  "User",
  userSchema
);