// controllers/auth/login.js

const userModel = require("../../models/user.model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    console.log("[AUTH] Login attempt for:", email);

    const normalizedEmail =
      email && String(email).trim().toLowerCase();

    // FIND USER (normalize email)
    const user = await userModel.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      console.log("[AUTH] User not found for:", normalizedEmail);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      console.log("[AUTH] Invalid password for:", normalizedEmail);
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // STORE TOKEN IN COOKIE
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const safeUser = user.toObject ? user.toObject() : { ...user };
    delete safeUser.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: safeUser,
    });
  } catch (err) {
    console.error("[AUTH] Login error:", err);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message,
    });
  }
};