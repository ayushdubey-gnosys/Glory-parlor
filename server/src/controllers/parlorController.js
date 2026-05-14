const Parlor = require("../models/parlor.model");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerParlor = async (req, res) => {
  try {
    const {
      parlorName,
      gstNumber,
      ownerName,
      email,
      phone,
      address,
      subscriptionPlan,
      adminPassword,
    } = req.body;

    if (!parlorName || !gstNumber || !ownerName || !email || !phone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // unique GST
    const existing = await Parlor.findOne({ gstNumber });
    if (existing) {
      return res.status(400).json({ message: "GST number already registered" });
    }

    const parlor = await Parlor.create({ parlorName, gstNumber, ownerName, email, phone, address, subscriptionPlan });

    // create admin user for this parlor if password provided
    let adminUser = null;
    if (adminPassword) {
      const hashed = await bcrypt.hash(adminPassword, 10);
      adminUser = await userModel.create({
        name: ownerName,
        email: String(email).trim().toLowerCase(),
        mobile: phone,
        password: hashed,
        role: "admin",
        parlorId: parlor._id,
      });

      // create token for admin
      const token = jwt.sign({ userId: adminUser._id, role: adminUser.role, parlorId: parlor._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    }

    res.status(201).json({ success: true, parlor, admin: adminUser ? { id: adminUser._id, email: adminUser.email } : null });
  } catch (err) {
    console.error("registerParlor error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getParlors = async (req, res) => {
  try {
    const parlors = await Parlor.find().sort({ createdAt: -1 });
    res.json(parlors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
