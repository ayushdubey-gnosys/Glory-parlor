const inquiryModel = require("../../models/inquiry.model");

// CREATE Inquiry
exports.createInquiry = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.user) {
      payload.createdBy = req.user._id;
      // ensure email exists on the inquiry for logged in customers
      if (!payload.email && req.user.email) payload.email = req.user.email;
    }

    const inquiry = await inquiryModel.create(payload);
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET All Inquiries
exports.getInquiries = async (req, res) => {
  try {
    // Support pagination and search for staff/admin; customers still only see their own
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const q = req.query.q ? String(req.query.q).trim() : "";
    const status = req.query.status ? String(req.query.status).trim() : undefined;

    // If customer, return only their inquiries (no pagination/search across other users)
    if (req.user && req.user.role === "customer") {
      const filter = { createdBy: req.user._id };
      if (q) {
        const regex = new RegExp(q, "i");
        filter.$or = [
          { name: regex },
          { phone: regex },
          { message: regex },
          { serviceInterest: regex },
          { reference: regex },
        ];
      }

      if (status) {
        filter.status = status;
      }

      const total = await inquiryModel.countDocuments(filter);
      const data = await inquiryModel.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      return res.json({ data, page, totalPages: Math.ceil(total / limit), total });
    }

    // staff/admin/superadmin: support search + pagination
    const filter = {};
    if (q) {
      const regex = new RegExp(q, "i");
      filter.$or = [
        { name: regex },
        { phone: regex },
        { message: regex },
        { serviceInterest: regex },
        { reference: regex },
        { response: regex },
      ];
    }

    // allow filtering by status
    if (status) {
      filter.status = status;
    }

    const total = await inquiryModel.countDocuments(filter);
    const data = await inquiryModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({ data, page, totalPages: Math.ceil(total / limit), total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Single Inquiry
exports.getInquiryById = async (req, res) => {
  try {
    const data = await inquiryModel.findById(req.params.id);
    if (!data) return res.status(404).json({ error: "Inquiry not found" });

    // customers can only view their own
    if (req.user && req.user.role === "customer") {
      if (!data.createdBy || String(data.createdBy) !== String(req.user._id)) {
        return res.status(403).json({ error: "Access denied" });
      }
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Inquiry
exports.updateInquiry = async (req, res) => {
  try {
    const inquiry = await inquiryModel.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ error: "Inquiry not found" });

    // If customer: only allow update of own inquiry fields
    if (req.user && req.user.role === "customer") {
      if (!inquiry.createdBy || String(inquiry.createdBy) !== String(req.user._id)) {
        return res.status(403).json({ error: "Access denied" });
      }

      const allowed = ["name", "phone", "serviceInterest", "preferredDate", "message", "reference"];
      allowed.forEach((k) => {
        if (req.body[k] !== undefined) inquiry[k] = req.body[k];
      });

      await inquiry.save();
      return res.json(inquiry);
    }

    // staff/admin/superadmin can update status/response
    if (req.user && ["staff", "admin", "superadmin"].includes(req.user.role)) {
      if (req.body.response) {
        inquiry.response = req.body.response;
        inquiry.respondedBy = req.user._id;
        inquiry.respondedAt = new Date();
      }

      if (req.body.status) inquiry.status = req.body.status;

      // allow other updates too
      ["name", "phone", "serviceInterest", "preferredDate", "message", "reference"].forEach((k) => {
        if (req.body[k] !== undefined) inquiry[k] = req.body[k];
      });

      await inquiry.save();
      return res.json(inquiry);
    }

    return res.status(403).json({ error: "Access denied" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Inquiry
exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await inquiryModel.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    // Customers can only delete their own inquiries
    if (req.user && req.user.role === "customer") {
      if (!inquiry.createdBy || String(inquiry.createdBy) !== String(req.user._id)) {
        return res.status(403).json({ error: "Access denied" });
      }
    }

    await inquiryModel.findByIdAndDelete(req.params.id);
    res.json({ msg: "Inquiry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};