const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: String,
    role: {
      type: String,
      enum: ["junior", "senior", "expert"],
    },
    phone: String,
    salary: Number,
    commission: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);