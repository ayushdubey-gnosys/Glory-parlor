// controllers/academy/academyController.js

const courseModel = require("../../models/course.model");



// CREATE COURSE
exports.createCourse = async (
  req,
  res
) => {
  try {
    console.log("BODY:", req.body);

    console.log("FILE:", req.file);

    const payload = {
      ...req.body,
    };

    if (
      req.file &&
      req.file.path
    ) {
      payload.image =
        req.file.path;
    }

    if (
      payload.durationValue ||
      payload.durationType
    ) {
      payload.duration = {
        value: Number(
          payload.durationValue || 0
        ),
        type: payload.durationType,
      };

      delete payload.durationValue;

      delete payload.durationType;
    }

    if (!payload.instructor) {
      delete payload.instructor;
    }

    if (payload.fees) {
      payload.fees = Number(
        payload.fees
      );
    }

    if (
      payload.syllabus &&
      typeof payload.syllabus ===
        "string"
    ) {
      payload.syllabus =
        payload.syllabus
          .split(",")
          .map((s) =>
            s.trim()
          )
          .filter(Boolean);
    }

    const course =
      await courseModel.create(
        payload
      );

    res.status(201).json(course);
  }
  
  catch (err) {
  console.log(
    "ERROR => ",
    JSON.stringify(err, null, 2)
  );

  console.log("MESSAGE => ", err.message);

  console.log("STACK => ", err.stack);

  return res.status(500).json({
    success: false,
    message: err.message,
  });
}
};



exports.getCourses = async (req, res) => {
  try {
    const courses = await courseModel
      .find()
      .populate("instructor", "name status role profilePic");

    res.json(courses);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};


// GET SINGLE COURSE
exports.getCourseById = async (
  req,
  res
) => {
  try {
    const course =
      await courseModel
        .findById(req.params.id)
        .populate(
          "instructor",
          "name status role profilePic"
        )
        .populate(
          "enrolledStudents"
        );

    if (!course) {
      return res
        .status(404)
        .json({
          error: "Course not found",
        });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

  // ENROLL customer in a course
  exports.enrollCourse = async (req, res) => {
    try {
      const course = await courseModel.findById(req.params.id);
      if (!course) return res.status(404).json({ error: "Course not found" });

      const userId = req.user && req.user._id;
      if (!userId) return res.status(401).json({ error: "Not authenticated" });

      // avoid duplicate
      const already = course.enrolledStudents?.some((id) => String(id) === String(userId));
      if (already) return res.status(200).json({ msg: "Already enrolled", course });

      course.enrolledStudents = course.enrolledStudents || [];
      course.enrolledStudents.push(userId);
      await course.save();

      const populated = await courseModel.findById(course._id).populate("instructor", "name profilePic").populate("enrolledStudents");

      res.json(populated);
    } catch (err) {
      console.error("enrollCourse error:", err);
      res.status(500).json({ error: err.message });
    }
  };



// UPDATE COURSE
exports.updateCourse = async (
  req,
  res
) => {
  try {
    const payload = { ...req.body };

    if (req.file && req.file.path) {
      payload.image = req.file.path;
    }

    // duration
    if (payload.durationValue || payload.durationType) {
      payload.duration = {
        value: Number(
          payload.durationValue || 0
        ),
        type: payload.durationType,
      };

      delete payload.durationValue;
      delete payload.durationType;
    }

    // numbers
    if (payload.fees) {
      payload.fees = Number(payload.fees);
    }

    if (payload.batchSize) {
      payload.batchSize = Number(
        payload.batchSize
      );
    }

    // boolean
    if (payload.isActive !== undefined) {
      payload.isActive =
        payload.isActive === "true" ||
        payload.isActive === true;
    }

    // syllabus
    if (
      payload.syllabus &&
      typeof payload.syllabus === "string"
    ) {
      payload.syllabus = payload.syllabus
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    const updated =
      await courseModel
        .findByIdAndUpdate(
          req.params.id,
          payload,
          {
            new: true,
          }
        )
        .populate("instructor", "name");

    if (!updated) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};



// DELETE COURSE
exports.deleteCourse = async (
  req,
  res
) => {
  try {
    const deleted =
      await courseModel.findByIdAndDelete(
        req.params.id
      );

    if (!deleted) {
      return res.status(404).json({
        error: "Course not found",
      });
    }

    res.json({
      msg: "Course deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};