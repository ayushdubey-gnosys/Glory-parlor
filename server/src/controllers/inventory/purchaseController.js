const Purchase = require("../../models/purchase.model");
const Product = require("../../models/product.model");

// Create Purchase
exports.createPurchase = async (req, res) => {
  try {
    const newPurchase = new Purchase({
      ...req.body,
      parlor: req.user.parlor,
    });
    await newPurchase.save();

    // Auto-update stock
    for (let item of req.body.products) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    res.status(201).json({ success: true, data: newPurchase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Purchases for a Parlor
exports.getPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ parlor: req.user.parlor }).populate("vendor").populate("products.product");
    res.status(200).json({ success: true, data: purchases });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Purchase
exports.updatePurchase = async (req, res) => {
  try {
    const purchase = await Purchase.findOneAndUpdate(
      { _id: req.params.id, parlor: req.user.parlor },
      req.body,
      { new: true }
    );
    if (!purchase) return res.status(404).json({ success: false, message: "Purchase not found" });
    res.status(200).json({ success: true, data: purchase });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
