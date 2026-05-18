
// controllers/auth/logout.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production" || req.headers.origin?.includes("vercel.app");

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    res.status(200).json({
      msg: "Logged out successfully"
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};