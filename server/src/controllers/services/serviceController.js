const serviceModel = require("../../models/service.model");

// CREATE Service
exports.createService = async (req, res) => {
  try {
    console.log("[createService] body:", req.body);
    console.log("[createService] file:", req.file && { originalname: req.file.originalname, path: req.file.path });

    const payload = { ...req.body };
    if (req.file && req.file.path) payload.image = req.file.path;
    if (payload.price) payload.price = Number(payload.price);
    if (payload.duration) payload.duration = Number(payload.duration);
    // normalize category to allowed enum values
    if (payload.category) {
      const cat = String(payload.category).toLowerCase();
      const allowed = ["premium", "middle", "economy", "other"];
      payload.category = allowed.includes(cat) ? cat : "other";
    }

    const service = await serviceModel.create(payload);
    res.status(201).json(service);
  } catch (err) {
    console.error("createService error:", err);
    const resp = { error: err.message };
    if (process.env.NODE_ENV !== "production") resp.stack = err.stack;
    res.status(500).json(resp);
  }
};

// GET All Services
exports.getServices = async (req, res) => {
  try {
    const services = await serviceModel.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET Single Service
exports.getServiceById = async (req, res) => {
  try {
    const service = await serviceModel.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Service
exports.updateService = async (req, res) => {
  try {
    console.log("[updateService] body:", req.body);
    console.log("[updateService] file:", req.file && { originalname: req.file.originalname, path: req.file.path });

    const payload = { ...req.body };
    if (req.file && req.file.path) payload.image = req.file.path;
    if (payload.price) payload.price = Number(payload.price);
    if (payload.duration) payload.duration = Number(payload.duration);

    const updated = await serviceModel.findByIdAndUpdate(req.params.id, payload, { returnDocument: 'after' });

    if (!updated) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE Service
exports.deleteService = async (req, res) => {
  try {
    const deleted = await serviceModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ msg: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};