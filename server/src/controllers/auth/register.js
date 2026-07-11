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
      dob,
      anniversary,
      address,
      gender,
      notes,
    } = req.body;

    // VALIDATION
    if (!name || !email || !mobile || !password || !dob || !anniversary || !address || !gender) {
      return res.status(400).json({
        message:
          "All required fields (Name, Email, Phone/Mobile, Password, DOB, Anniversary, Address, Gender) must be provided",
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

        dob: dob ? new Date(dob) : undefined,
        anniversary: anniversary ? new Date(anniversary) : undefined,
        address: address || "",
        gender: gender || "Female",
        notes: notes || "",

        role:
          role || "customer",
      });

    // CREATE CUSTOMER RECORD
    if (
      (role || "customer") ===
      "customer"
    ) {
      // CHECK CUSTOMER EMAIL / PHONE
      const existingCustomer =
        await customerModel.findOne({
          $or: [
            { email },
            { phone: mobile },
          ],
        });

      // CREATE OR LINK
      if (!existingCustomer) {
        await customerModel.create({
          name,
          phone: mobile,
          email,
          profilePic:
            req.file?.path || user.profilePic,
          dob: dob ? new Date(dob) : undefined,
          anniversary: anniversary ? new Date(anniversary) : undefined,
          address: address || "",
          gender: gender || "Female",
          notes: notes || "",
          createdBy: user._id,
        });
      } else {
        existingCustomer.createdBy = user._id;
        if (!existingCustomer.phone && mobile) existingCustomer.phone = mobile;
        if (!existingCustomer.dob && dob) existingCustomer.dob = new Date(dob);
        if (!existingCustomer.anniversary && anniversary) existingCustomer.anniversary = new Date(anniversary);
        if (!existingCustomer.address && address) existingCustomer.address = address;
        if (!existingCustomer.gender && gender) existingCustomer.gender = gender;
        if (!existingCustomer.notes && notes) existingCustomer.notes = notes;
        await existingCustomer.save();
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