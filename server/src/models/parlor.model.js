const mongoose = require("mongoose");

const parlorSchema = new mongoose.Schema(
  {
    parlorName: { type: String, required: true },
    gstNumber: { type: String, required: true, unique: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: String,
    subscriptionPlan: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parlor", parlorSchema);
