const express = require("express");
const router = express.Router();

const serviceController = require("../controllers/services/serviceController");

const { protect, authorize } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// CREATE
router.post(
  "/",
  protect,
  authorize("admin", "staff", "superadmin"),
  upload.fields([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }]),
  serviceController.createService
);

// GET ALL
router.get("/", serviceController.getServices);

// GET ONE
router.get("/:id", serviceController.getServiceById);

// UPDATE
router.patch(
  "/:id",
  protect,
  authorize("admin", "staff", "superadmin"),
  upload.fields([{ name: "image", maxCount: 1 }, { name: "video", maxCount: 1 }]),
  serviceController.updateService
);

// DELETE
router.delete(
  "/:id",
  protect,
  authorize("superadmin"),
  serviceController.deleteService
);

module.exports = router;