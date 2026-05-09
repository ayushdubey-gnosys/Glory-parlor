// routes/appointmentRoutes.js

const express = require("express");

const router = express.Router();

const appointmentController = require(
  "../controllers/appointment/appointmentController"
);

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// CUSTOMER + ADMIN + STAFF ACCESS

router.post(
  "/",
  protect,
  authorize(
    "customer",
    "admin",
    "staff",
    "superadmin"
  ),
  appointmentController.createAppointment
);

// ADMIN + STAFF + CUSTOMER ACCESS

router.get(
  "/",
  protect,
  authorize(
    "customer",
    "admin",
    "staff",
    "superadmin"
  ),
  appointmentController.getAppointments
);

// ADMIN + STAFF ACCESS

router.patch(
  "/:id",
  protect,
  authorize(
    "customer",
    "admin",
    "staff",
    "superadmin"
  ),
  appointmentController.updateAppointment
);

// SUPERADMIN ONLY

router.delete(
  "/:id",
  protect,
  authorize("customer", "admin", "staff", "superadmin"),
  appointmentController.deleteAppointment
);

module.exports = router;