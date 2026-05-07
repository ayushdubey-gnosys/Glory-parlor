const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: String,
    category: {
      type: String,
      enum: ["premium", "middle", "economy"],
    },
    price: Number,
    duration: Number, // minutes
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);