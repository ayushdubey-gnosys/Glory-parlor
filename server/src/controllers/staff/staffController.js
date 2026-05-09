// controllers/staff/staffController.js
const staffModel = require("../../models/staff.model");
const userModel = require("../../models/user.model");
const bcrypt = require("bcryptjs");

exports.createStaff = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file && req.file.path) payload.profilePic = req.file.path;
    if (payload.salary) payload.salary = Number(payload.salary);

    // normalize status to enum values (lowercase)
    if (payload.status) payload.status = String(payload.status).toLowerCase();

    // Optionally create a User account for the staff when email+password provided
    let createdUser = null;
    if (req.body.email && req.body.password) {
      const normalizedEmail = String(req.body.email).trim().toLowerCase();
      const existing = await userModel.findOne({ $or: [{ email: normalizedEmail }, { mobile: payload.phone }] });

      if (existing) {
        // update existing user with staff role and new password if provided
        if (req.body.password) {
          const hashed = await bcrypt.hash(req.body.password, 10);
          existing.password = hashed;
        }
        existing.role = "staff";
        if (payload.profilePic) existing.profilePic = payload.profilePic;
        if (payload.name) existing.name = payload.name;
        if (req.body.email) existing.email = normalizedEmail;
        if (payload.phone) existing.mobile = payload.phone;
        await existing.save();
        createdUser = existing;
      } else {
        const hashed = await bcrypt.hash(req.body.password, 10);
        createdUser = await userModel.create({
          name: payload.name || req.body.name,
          email: normalizedEmail,
          mobile: payload.phone || req.body.mobile,
          password: hashed,
          role: "staff",
          profilePic: payload.profilePic,
        });
      }

      if (createdUser) payload.user = createdUser._id;
    }

    const staff = await staffModel.create(payload);
    return res.json(staff);
  } catch (err) {
    console.error("createStaff error:", err);
    // handle mongoose validation errors clearly
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation failed", errors: err.errors });
    }
    return res.status(500).json({ error: err.message });
  }
};

exports.getStaff = async (req, res) => {
  const staff = await staffModel.find();
  res.json(staff);
};

// GET single staff by id
exports.getStaffById = async (req, res) => {
  try {
    const s = await staffModel.findById(req.params.id).populate("user");
    if (!s) return res.status(404).json({ error: "Staff not found" });
    res.json(s);
  } catch (err) {
    console.error("getStaffById error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file && req.file.path) update.profilePic = req.file.path;
    if (update.salary) update.salary = Number(update.salary);

    // normalize status
    if (update.status) update.status = String(update.status).toLowerCase();

    // If email/password provided, update or create linked User
    const staff = await staffModel.findById(req.params.id);
    if (!staff) return res.status(404).json({ error: "Staff not found" });

    if ((update.email || update.password) && staff.user) {
      const u = await userModel.findById(staff.user);
      if (u) {
        if (update.email) u.email = String(update.email).trim().toLowerCase();
        if (update.password) u.password = await bcrypt.hash(update.password, 10);
        if (update.phone) u.mobile = update.phone;
        if (update.name) u.name = update.name;
        if (update.profilePic) u.profilePic = update.profilePic;
        u.role = "staff";
        await u.save();
      }
    } else if ((update.email && update.password) && !staff.user) {
      const hashed = await bcrypt.hash(update.password, 10);
      const newUser = await userModel.create({
        name: update.name || staff.name,
        email: String(update.email).trim().toLowerCase(),
        mobile: update.phone || staff.phone,
        password: hashed,
        role: "staff",
        profilePic: update.profilePic || staff.profilePic,
      });
      update.user = newUser._id;
    }

    const updated = await staffModel.findByIdAndUpdate(req.params.id, update, { returnDocument: "after" });

    if (!updated) return res.status(404).json({ error: "Staff not found" });

    res.json(updated);
  } catch (err) {
    console.error("updateStaff error:", err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Validation failed", errors: err.errors });
    }
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const deleted = await staffModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.json({ msg: "Staff deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.calculateIncentive = async (req, res) => {
//   const { sales } = req.body;

//   let incentive = 0;

//   if (sales >= 150000) incentive = sales * 0.05;
//   else if (sales >= 100000) incentive = sales * 0.02;

//   res.json({ incentive });
// };

exports.calculateIncentive = async (req, res) => {
  try {
    const {
      staffId,
      productSalesCount,
      serviceSalesAmount,
    } = req.body;

    const staff = await staffModel.findById(staffId);

    if (!staff) {
      return res.status(404).json({
        error: "Staff not found",
      });
    }

    // PRODUCT COMMISSION
    const productCommission =
      productSalesCount * 30;

    // SERVICE COMMISSION
    let serviceCommission = 0;
    let percentage = 0;

    if (serviceSalesAmount >= 150000) {
      percentage = 5;
    } else if (serviceSalesAmount >= 100000) {
      percentage = 2;
    }

    serviceCommission =
      serviceSalesAmount *
      (percentage / 100);

    // TOTAL
    const totalIncentive =
      productCommission +
      serviceCommission;

    res.json({
      staff: staff.name,
      role: staff.role,

      productSalesCount,
      productCommission,

      serviceSalesAmount,
      serviceCommissionPercentage:
        `${percentage}%`,
      serviceCommission,

      totalIncentive,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};