const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    serviceInterest: String,
    preferredDate: Date,
    reference: String,
    status: {
      type: String,
      enum: ["new", "follow-up", "converted", "lost"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);