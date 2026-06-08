// routes/inventoryRoutes.js

const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventory/inventoryController");

const { protect, authorize } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

router.post(
	"/",
	protect,
	authorize("admin", "staff", "superadmin"),
	upload.single("image"),
	inventoryController.addProduct
);

router.get("/", inventoryController.getProducts);

router.patch(
	"/:id",
	protect,
	authorize("admin", "staff", "superadmin"),
	upload.single("image"),
	inventoryController.updateProduct
);

router.delete("/:id", protect, authorize("superadmin"), inventoryController.deleteProduct);

router.patch("/stock", protect, authorize("admin", "staff", "superadmin"), inventoryController.updateStock);

module.exports = router;