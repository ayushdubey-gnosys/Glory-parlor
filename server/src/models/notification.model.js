const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: String,

    message: String,

    type: {
      type: String,
      enum: ["campaign", "appointment", "billing"],
      default: "campaign",
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Notification",
  notificationSchema
);