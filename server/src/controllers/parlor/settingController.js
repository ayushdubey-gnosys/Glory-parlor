const Setting = require("../../models/setting.model");

// Get Settings for Parlor
exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({ parlor: req.user.parlor });
    if (!settings) {
      settings = new Setting({ parlor: req.user.parlor });
      await settings.save();
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Settings
exports.updateSettings = async (req, res) => {
  try {
    const settings = await Setting.findOneAndUpdate(
      { parlor: req.user.parlor },
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
