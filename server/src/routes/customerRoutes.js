const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer/customerController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

// CREATE
router.post(
  "/",
  protect,
  authorize(
    "admin",
    "staff",
    "superadmin"
  ),
  upload.single("profilePic"),
  customerController.createCustomer
);

// current authenticated user's customer profile
router.get("/me", protect, customerController.getMyCustomer);
router.post("/me", protect, upload.single("profilePic"), customerController.createMyCustomer);
router.patch("/me", protect, upload.single("profilePic"), customerController.updateMyCustomer);

// GET ALL
router.get(
  "/",
  protect,
  authorize(
    "admin",
    "staff",
    "superadmin"
  ),
  customerController.getCustomers
);

// GET ONE
router.get(
  "/:id",
  protect,
  authorize(
    "admin",
    "staff",
    "superadmin"
  ),
  customerController.getCustomerById
);

// UPDATE
router.patch(
  "/:id",
  protect,
  upload.single("profilePic"),
  customerController.updateCustomer
);

// DELETE
router.delete(
  "/:id",
  protect,
  authorize("admin", "staff", "superadmin"),
  customerController.deleteCustomer
);

module.exports = router;