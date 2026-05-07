// controllers/inventory/inventoryController.js
const productModel = require("../../models/product.model");

exports.addProduct = async (req, res) => {
  const product = await productModel.create(req.body);
  res.json(product);
};

exports.getProducts = async (req, res) => {
  const products = await productModel.find();
  res.json(products);
};

exports.updateStock = async (req, res) => {
  try {
    const { id, qty } = req.body;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.stock < qty) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    product.stock -= qty;

    await product.save();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updated = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );

    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await productModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ msg: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};