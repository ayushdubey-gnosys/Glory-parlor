// routes/inquiryRoutes.js

const express = require("express");

const router = express.Router();

const inquiryController = require(
  "../controllers/inquiry/inquiryController"
);

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// CREATE inquiry (customers + staff/admin allowed)
router.post(
  "/",
  protect,
  authorize("customer", "admin", "staff", "superadmin"),
  inquiryController.createInquiry
);

// GET inquiries: role-based in controller (customers see own, staff/admin see all)
router.get("/", protect, inquiryController.getInquiries);

// GET single inquiry
router.get("/:id", protect, inquiryController.getInquiryById);

// UPDATE inquiry (customers can update own; staff/admin can update/respond)
router.patch("/:id", protect, inquiryController.updateInquiry);

// DELETE inquiry (admin + superadmin + customer)
router.delete(
  "/:id",
  protect,
  authorize("admin", "superadmin", "customer"),
  inquiryController.deleteInquiry
);

module.exports = router;