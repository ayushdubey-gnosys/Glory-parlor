const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    services: [
      {
        service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
        price: Number,
      },
    ],
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        price: Number,
        qty: Number,
      },
    ],
    totalAmount: Number,
    discount: Number,
    finalAmount: Number,
    paymentMethod: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);