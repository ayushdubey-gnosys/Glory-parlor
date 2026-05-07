// controllers/auth/login.js

const userModel = require("../../models/user.model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // FIND USER

    const user =
      await userModel.findOne({
        email,
      });

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    // CHECK PASSWORD

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Invalid credentials",
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

      secure: false,

      sameSite: "lax",

      maxAge:
        7 *
        24 *
        60 *
        60 *
        1000,
    });

    res.status(200).json({
      message:
        "Login successful",

      token,

      user,
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Login failed",

      error: err.message,
    });
  }
};