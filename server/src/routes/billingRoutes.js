// routes/billingRoutes.js

const express = require("express");

const router = express.Router();

const billingController = require(
  "../controllers/billing/billingController"
);

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// GENERATE INVOICE
// ONLY ADMIN + STAFF + SUPERADMIN

router.post(
  "/invoice",

  protect,

  authorize(
    "admin",
    "staff",
    "superadmin"
  ),

  billingController.generateInvoice
);

module.exports = router;