// controllers/inventory/inventoryController.js
const productModel = require("../../models/product.model");

exports.addProduct = async (req, res) => {
  try {
    console.log("[addProduct] body:", req.body);
    console.log("[addProduct] file:", req.file && { originalname: req.file.originalname, path: req.file.path });

    const parseNumber = (v) => {
      if (v === undefined || v === null) return undefined;
      // strip any non-numeric characters (like currency symbols) then parse
      const cleaned = String(v).replace(/[^0-9.-]+/g, "");
      if (cleaned === "") return undefined;
      const n = Number(cleaned);
      return Number.isFinite(n) ? n : undefined;
    };

    const payload = { ...req.body };
    if (req.file && req.file.path) payload.image = req.file.path;

    const cp = parseNumber(payload.costPrice);
    const sp = parseNumber(payload.sellingPrice);
    const st = parseNumber(payload.stock);

    if (cp !== undefined) payload.costPrice = cp;
    if (sp !== undefined) payload.sellingPrice = sp;
    if (st !== undefined) payload.stock = st;

    const product = await productModel.create(payload);
    res.json(product);
  } catch (err) {
    console.error("addProduct error:", err);
    // send validation errors in a friendly shape when available
    if (err.name === 'ValidationError') {
      const errors = Object.keys(err.errors).reduce((acc, k) => {
        acc[k] = err.errors[k].message || err.errors[k].reason || err.errors[k].kind;
        return acc;
      }, {});
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    res.status(500).json({ error: err.message });
  }
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
    console.log("[updateProduct] body:", req.body);
    console.log("[updateProduct] file:", req.file && { originalname: req.file.originalname, path: req.file.path });

    const parseNumber = (v) => {
      if (v === undefined || v === null) return undefined;
      const cleaned = String(v).replace(/[^0-9.-]+/g, "");
      if (cleaned === "") return undefined;
      const n = Number(cleaned);
      return Number.isFinite(n) ? n : undefined;
    };

    const payload = { ...req.body };
    if (req.file && req.file.path) payload.image = req.file.path;

    const cp = parseNumber(payload.costPrice);
    const sp = parseNumber(payload.sellingPrice);
    const st = parseNumber(payload.stock);

    if (cp !== undefined) payload.costPrice = cp;
    if (sp !== undefined) payload.sellingPrice = sp;
    if (st !== undefined) payload.stock = st;

    const updated = await productModel.findByIdAndUpdate(req.params.id, payload, { returnDocument: 'after' });

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