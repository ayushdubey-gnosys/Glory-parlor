const express = require("express");
const router = express.Router();
const { registerParlor, getParlors } = require("../controllers/parlorController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Register a new parlor (public)
router.post("/register", registerParlor);

// List parlors (superadmin only)
router.get("/", protect, authorize("superadmin"), getParlors);

module.exports = router;
