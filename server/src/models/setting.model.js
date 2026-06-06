const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    parlor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parlor",
      required: true,
      unique: true,
    },
    invoiceSettings: {
      prefix: { type: String, default: "INV-" },
      taxRate: { type: Number, default: 18 }, // GST default 18%
      termsAndConditions: String,
    },
    loyaltySettings: {
      pointsPerRupee: { type: Number, default: 0.1 },
      redemptionValue: { type: Number, default: 1 }, // 1 point = 1 rupee
    },
    notificationSettings: {
      emailEnabled: { type: Boolean, default: true },
      smsEnabled: { type: Boolean, default: false },
      whatsappEnabled: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Setting", settingSchema);
