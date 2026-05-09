const userModel = require("../../models/user.model");

const bcrypt = require("bcryptjs");

const customerModel = require("../../models/customer.model");


exports.register = async (req, res) => {
  try {
    console.log("[REGISTER] Body:", req.body);

    const {
      name,
      email,
      mobile,
      password,
      role,
    } = req.body;

    // VALIDATION

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({
        message:
          "All fields are required",
      });
    }

    // CHECK USER EMAIL

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

    // CHECK USER MOBILE

    const existingMobile =
      await userModel.findOne({
        mobile,
      });

    if (existingMobile) {
      return res.status(400).json({
        message:
          "Mobile already exists",
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
        password:
          hashedPassword,

        profilePic:
          req.file?.path,

        role:
          role || "customer",
      });

    // CREATE CUSTOMER RECORD

    if (
      (role || "customer") ===
      "customer"
    ) {
      // CHECK CUSTOMER EMAIL

      const existingCustomer =
        await customerModel.findOne({
          $or: [
            { email },
            { phone: mobile },
          ],
        });

      // CREATE ONLY IF NOT EXISTS

      if (!existingCustomer) {
        await customerModel.create({
          name,
          phone: mobile,
          email,

          profilePic:
            req.file?.path,
        });
      }
    }

    res.status(201).json({
      message:
        "Registration successful",

      user,
    });
  } catch (err) {
    console.log(
      "REGISTER ERROR:",
      err
    );

    res.status(500).json({
      message:
        "Registration failed",

      error: err.message,
    });
  }
};