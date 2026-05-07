// routes/marketingRoutes.js

const express = require("express");
const router = express.Router();

const marketingController = require("../controllers/marketing/marketingController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/campaign", protect, authorize("admin", "superadmin"), marketingController.sendCampaign);

module.exports = router;