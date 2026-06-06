const mongoose = require("mongoose");

const loyaltySchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    pointsBalance: { type: Number, default: 0 },
    walletBalance: { type: Number, default: 0 },
    membershipPlan: {
      type: String,
      enum: ["none", "silver", "gold", "platinum"],
      default: "none",
    },
    parlor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parlor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Loyalty", loyaltySchema);
