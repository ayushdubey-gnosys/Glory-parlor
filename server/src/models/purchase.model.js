const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
        costPrice: { type: Number, required: true },
      },
    ],
    totalCost: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "completed",
    },
    purchaseDate: { type: Date, default: Date.now },
    invoiceNumber: String,
    parlor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parlor",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
