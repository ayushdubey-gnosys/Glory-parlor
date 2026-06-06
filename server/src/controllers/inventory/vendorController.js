const Vendor = require("../../models/vendor.model");

// Create Vendor
exports.createVendor = async (req, res) => {
  try {
    const newVendor = new Vendor({
      ...req.body,
      parlor: req.user.parlor, // Assuming auth middleware sets req.user.parlor
    });
    await newVendor.save();
    res.status(201).json({ success: true, data: newVendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Vendors for a Parlor
exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find({ parlor: req.user.parlor });
    res.status(200).json({ success: true, data: vendors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Vendor
exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndUpdate(
      { _id: req.params.id, parlor: req.user.parlor },
      req.body,
      { new: true }
    );
    if (!vendor) return res.status(404).json({ success: false, message: "Vendor not found" });
    res.status(200).json({ success: true, data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Vendor
exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndDelete({ _id: req.params.id, parlor: req.user.parlor });
    if (!vendor) return res.status(404).json({ success: false, message: "Vendor not found" });
    res.status(200).json({ success: true, message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
