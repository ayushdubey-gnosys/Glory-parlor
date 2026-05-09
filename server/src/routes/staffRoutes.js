const express = require("express");
const router = express.Router();

const staffController = require("../controllers/staff/staffController");

const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", protect, authorize("admin", "superadmin"), upload.single("profilePic"), staffController.createStaff);

// Public: allow customers to view staff list (so they can pick staff when booking)
router.get("/", staffController.getStaff);

// GET single staff (public)
router.get("/:id", staffController.getStaffById);

router.patch("/:id", protect, authorize("admin", "superadmin"), upload.single("profilePic"), staffController.updateStaff);

router.delete("/:id", protect, authorize("superadmin"), staffController.deleteStaff);

router.post("/incentive", protect, authorize("admin", "superadmin"), staffController.calculateIncentive);

module.exports = router;