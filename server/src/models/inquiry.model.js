const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    serviceInterest: String,
    preferredDate: Date,
    reference: String,
    message: String,
    createdBy: {
      type: require('mongoose').Schema.Types.ObjectId,
      ref: 'User',
    },
    response: String,
    respondedBy: {
      type: require('mongoose').Schema.Types.ObjectId,
      ref: 'User',
    },
    respondedAt: Date,
    status: {
      type: String,
      enum: ["new", "follow-up", "converted", "lost"],
      default: "new",
    },
    parlor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parlor",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", inquirySchema);