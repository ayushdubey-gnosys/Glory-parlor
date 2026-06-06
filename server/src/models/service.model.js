const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: String,
    image: String,
    category: {
      type: String,
      enum: ["premium", "middle", "economy", "other"],
    },
    price: Number,
    duration: Number, // minutes
    description: String,
    parlor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parlor",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);