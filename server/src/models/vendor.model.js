const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    contactPerson: String,
    phone: { type: String, required: true },
    email: String,
    address: String,
    gstNumber: String,
    paymentTerms: String,
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    parlor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parlor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendor", vendorSchema);
