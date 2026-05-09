const userModel = require("../../models/user.model");

exports.updateProfile = async (req, res) => {
  try {
    const { name, mobile } = req.body;

    const update = {};
    if (name) update.name = name;
    if (mobile) update.mobile = mobile;
    if (req.file && req.file.path) update.profilePic = req.file.path;

    const user = await userModel.findByIdAndUpdate(req.user._id, update, { new: true }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user, message: "Profile updated" });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
};
