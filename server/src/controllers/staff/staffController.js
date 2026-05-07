// controllers/staff/staffController.js
const staffModel = require("../../models/staff.model");

exports.createStaff = async (req, res) => {
  const staff = await staffModel.create(req.body);
  res.json(staff);
};

exports.getStaff = async (req, res) => {
  const staff = await staffModel.find();
  res.json(staff);
};

exports.updateStaff = async (req, res) => {
  try {
    const updated = await staffModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );

    if (!updated) {
      return res.status(404).json({ error: "Staff not found" });
    }

    res.json(updated);
  } catch (err) {
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