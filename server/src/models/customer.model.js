const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    dob: Date,
    anniversary: Date,

    role: {
      type: String,
      enum: ["customer", "student"],
      default: "customer",
    },

    category: {
      type: String,
      enum: ["premium", "middle", "economy"],
      default: "middle",
    },

    notes: String,
    visitCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);