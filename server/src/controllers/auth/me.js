const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");

exports.me = async (req, res) => {
  try {
    console.log("ME called, cookies:", req.cookies);
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ msg: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
