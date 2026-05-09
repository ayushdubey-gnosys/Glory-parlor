const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      value: { type: Number, required: true },
      type: {
        type: String,
        enum: ["days", "weeks", "months", "years"],
        required: true,
      },
    },

    fees: {
      type: Number,
      required: true,
      min: 0,
    },

    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },

    image: String,

    category: {
      type: String,
      enum: ["makeup", "hair", "skin", "nails"],
    },

    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    description: String,

    syllabus: {
      type: [String],
      default: [],
    },

    batchSize: {
      type: Number,
      default: 10,
    },

    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);