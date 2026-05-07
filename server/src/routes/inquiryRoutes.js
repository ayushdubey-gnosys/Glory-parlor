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

// CUSTOMER CAN CREATE

router.post(
  "/",
  protect,
  authorize(
    "customer",
    "admin",
    "staff",
    "superadmin"
  ),
  inquiryController.createInquiry
);

// STAFF + ADMIN CAN VIEW

router.get(
  "/",
  protect,
  authorize(
    "admin",
    "staff",
    "superadmin"
  ),
  inquiryController.getInquiries
);

// ADMIN ONLY UPDATE

router.patch(
  "/:id",
  protect,
  authorize(
    "admin",
    "superadmin"
  ),
  inquiryController.updateInquiry
);

// SUPERADMIN DELETE

router.delete(
  "/:id",
  protect,
  authorize("superadmin"),
  inquiryController.deleteInquiry
);

module.exports = router;