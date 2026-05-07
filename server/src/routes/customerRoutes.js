// routes/customerRoutes.js
const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer/customerController");

router.post("/", customerController.createCustomer);
router.get("/", customerController.getCustomers);
router.get("/:id", customerController.getCustomerById);
router.patch("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;