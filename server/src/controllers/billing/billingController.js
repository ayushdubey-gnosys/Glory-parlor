// controllers/billing/billingController.js
const InvoiceModel = require("../../models/invoice.model");
const ProductModel = require("../../models/product.model");

exports.generateInvoice = async (req, res) => {
  try {
    const {
      services,
      products,
      customer,
      paymentMethod,
      discount,
      discountPercent,
      totalAmount,
      finalAmount,
    } = req.body;

    let total = 0;

    products.forEach(p => {
      total += (Number(p.price) || 0) * (Number(p.qty) || 0);
    });

    services.forEach(s => {
      total += Number(s.price) || 0;
    });

    const calculatedDiscountAmount =
      discount !== undefined
        ? Number(discount)
        : discountPercent
        ? (total * Number(discountPercent)) / 100
        : 0;

    const calculatedFinalAmount =
      finalAmount !== undefined
        ? Number(finalAmount)
        : Math.max(0, total - calculatedDiscountAmount);

    const invoice = await InvoiceModel.create({
      customer,
      services,
      products,
      totalAmount: totalAmount || total,
      discount: calculatedDiscountAmount,
      discountPercent: Number(discountPercent) || 0,
      finalAmount: calculatedFinalAmount,
      paymentMethod: paymentMethod || "Cash",
    });

    res.status(201).json(invoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};