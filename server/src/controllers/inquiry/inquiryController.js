const inquiryModel = require("../../models/inquiry.model");

// CREATE Inquiry
exports.createInquiry = async (req, res) => {
  try {
    const inquiry = await inquiryModel.create(req.body);
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET All Inquiries
exports.getInquiries = async (req, res) => {
  try {
    const data = await inquiryModel.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Single Inquiry
exports.getInquiryById = async (req, res) => {
  try {
    const data = await inquiryModel.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ error: "Inquiry not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Inquiry
exports.updateInquiry = async (req, res) => {
  try {
    const updated = await inquiryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );

    if (!updated) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Inquiry
exports.deleteInquiry = async (req, res) => {
  try {
    const deleted = await inquiryModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    res.json({ msg: "Inquiry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};