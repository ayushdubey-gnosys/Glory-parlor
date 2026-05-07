const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
    amount: Number,
    method: String,
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "paid",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);