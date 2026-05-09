const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: String,
      role: {
        type: String,
        enum: ["junior", "senior", "expert"],
      },
      user: {
        type: require('mongoose').Schema.Types.ObjectId,
        ref: 'User',
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
      phone: String,
      timing: String,
      salary: Number,
      commission: Number,
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
      },
      experience: {
        // years of experience
        type: Number,
        default: 0,
      },
      profilePic: {
        type: String,
        default: "https://images.unsplash.com/photo-1740252117012-bb53ad05e370?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);