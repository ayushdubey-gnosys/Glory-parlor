// controllers/billing/billingController.js
const InvoiceModel = require("../../models/invoice.model");
const ProductModel = require("../../models/product.model");

exports.generateInvoice = async (req, res) => {
  try {
    const { services, products, customer } = req.body;

    let total = 0;

    products.forEach(p => {
      total += p.price * p.qty;
    });

    services.forEach(s => {
      total += s.price;
    });

    const invoice = await InvoiceModel.create({
      customer,
      services,
      products,
      total,
    });

    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};