
// controllers/auth/logout.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,      // true in production (HTTPS)
      sameSite: "strict",
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