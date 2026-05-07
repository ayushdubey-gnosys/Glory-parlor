// controllers/academy/academyController.js
const courseModel = require("../../models/course.model");

exports.createCourse = async (req, res) => {
  const course = await courseModel.create(req.body);
  res.json(course);
};

exports.getCourses = async (req, res) => {
  const courses = await courseModel.find();
  res.json(courses);
};




//  GET Single Course
exports.getCourseById = async (req, res) => {
  try {
    const course = await courseModel
      .findById(req.params.id)
      .populate("instructor")   // optional but useful
      .populate("enrolledStudents");

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//  UPDATE Course
exports.updateCourse = async (req, res) => {
  try {
    const updated = await courseModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );

    if (!updated) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//  DELETE Course
exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await courseModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ msg: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};