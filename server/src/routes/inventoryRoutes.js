// routes/inventoryRoutes.js

const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventory/inventoryController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", protect, authorize("admin", "staff", "superadmin"), inventoryController.addProduct);

router.get("/", protect, authorize("admin", "staff", "superadmin"), inventoryController.getProducts);

router.patch("/:id", protect, authorize("admin", "staff", "superadmin"), inventoryController.updateProduct);

router.delete("/:id", protect, authorize("superadmin"), inventoryController.deleteProduct);

router.patch("/stock", protect, authorize("admin", "staff", "superadmin"), inventoryController.updateStock);

module.exports = router;