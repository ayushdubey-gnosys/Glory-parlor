const express = require("express");
const router = express.Router();

const staffController = require("../controllers/staff/staffController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", protect, authorize("admin", "superadmin"), staffController.createStaff);

router.get("/", protect, authorize("admin", "staff", "superadmin"), staffController.getStaff);

router.patch("/:id", protect, authorize("admin", "superadmin"), staffController.updateStaff);

router.delete("/:id", protect, authorize("superadmin"), staffController.deleteStaff);

router.post("/incentive", protect, authorize("admin", "superadmin"), staffController.calculateIncentive);

module.exports = router;