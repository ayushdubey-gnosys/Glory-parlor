const serviceModel = require("../../models/service.model");

// CREATE Service
exports.createService = async (req, res) => {
  try {
    const service = await serviceModel.create(req.body);
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const updated = await serviceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );

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