// routes/academyRoutes.js

const express = require("express");

const router = express.Router();

const academyController = require(
  "../controllers/academy/academyController"
);

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// CREATE COURSE
// ONLY ADMIN + SUPERADMIN

router.post(
  "/",
  protect,
  authorize(
    "admin",
    "superadmin"
  ),
  academyController.createCourse
);

// GET ALL COURSES
// PUBLIC ACCESS

router.get(
  "/",
  academyController.getCourses
);

// GET SINGLE COURSE
// PUBLIC ACCESS

router.get(
  "/:id",
  academyController.getCourseById
);

// UPDATE COURSE
// ONLY ADMIN + SUPERADMIN

router.patch(
  "/:id",
  protect,
  authorize(
    "admin",
    "superadmin"
  ),
  academyController.updateCourse
);

// DELETE COURSE
// ONLY SUPERADMIN

router.delete(
  "/:id",
  protect,
  authorize("superadmin"),
  academyController.deleteCourse
);

module.exports = router;