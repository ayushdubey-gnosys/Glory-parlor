const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    brand: String,
    costPrice: Number,
    sellingPrice: Number,
    stock: Number,
    type: {
      type: String,
      enum: ["salon-use", "sale-only", "dual-use"],
    },
    expiryDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);