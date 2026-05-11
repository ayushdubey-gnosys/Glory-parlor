const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
    date: Date,
    time: String,
    status: {
      type: String,
      enum: ["unbooked", "booked", "completed", "cancelled"],
      default: "unbooked",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);