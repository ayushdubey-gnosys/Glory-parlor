const mongoose = require("mongoose");

const productUsageSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    quantityUsed: { type: Number, required: true },
    usageDate: { type: Date, default: Date.now },
    parlor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parlor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductUsage", productUsageSchema);
