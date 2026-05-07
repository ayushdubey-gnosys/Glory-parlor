// controllers/auth/register.js

const userModel = require("../../models/user.model");

const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      password,
      role,
    } = req.body;

    // CHECK EMAIL

    const existingEmail =
      await userModel.findOne({
        email,
      });

    if (existingEmail) {
      return res.status(400).json({
        message:
          "Email already exists",
      });
    }

    // CHECK MOBILE

    const existingMobile =
      await userModel.findOne({
        mobile,
      });

    if (existingMobile) {
      return res.status(400).json({
        message:
          "Mobile number already exists",
      });
    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER

    const user =
      await userModel.create({
        name,
        email,
        mobile,
        password: hashedPassword,

        // DEFAULT ROLE
        role: role || "customer",
      });

    res.status(201).json({
      message:
        "Registration successful",

      user,
    });
  } catch (err) {
    res.status(500).json({
      message:
        "Registration failed",

      error: err.message,
    });
  }
};