const express = require("express");
const router = express.Router();

const notificationModel = require("../models/notification.model");
const customerModel = require("../models/customer.model");

const { protect, authorize } = require("../middleware/authMiddleware");

// Admin / staff: list all notifications (protected + role)
router.get(
  "/",
  protect,
  authorize("admin", "superadmin", "staff"),
  async (req, res) => {
    try {
      const notifications = await notificationModel
        .find()
        .populate("customer")
        .sort({ createdAt: -1 });

      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Customer: get only my notifications
router.get("/my", protect, async (req, res) => {
  try {
    // resolve Customer record from authenticated user
    const cust = await customerModel.findOne({
      $or: [{ email: req.user.email }, { phone: req.user.mobile }],
    });

    if (!cust) {
      return res.json([]);
    }

    const notifications = await notificationModel
      .find({ customer: cust._id })
      .populate("customer")
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;