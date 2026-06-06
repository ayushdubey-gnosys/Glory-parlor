const Staff = require("../../models/staff.model");
const Invoice = require("../../models/invoice.model");

// Calculate Incentives based on Date Range
exports.calculateIncentives = async (req, res) => {
  try {
    const { startDate, endDate, staffId } = req.query;
    
    // Find all invoices for this staff in date range
    // NOTE: Requires updating Invoice schema to link to Staff, or Appointment to Invoice.
    // For now, this is a basic stub based on the rules: Product Sale = ₹30, Service Sale 1 Lac = 2%, 1.5 Lac = 5%
    
    // In a real implementation we would aggregate revenue over the date range
    const staff = await Staff.findOne({ _id: staffId, parlor: req.user.parlor });
    if (!staff) return res.status(404).json({ success: false, message: "Staff not found" });

    let totalServiceRevenue = staff.revenueGenerated; // Placeholder for aggregated sum
    let totalProductSalesCount = 0; // Placeholder

    let serviceIncentive = 0;
    if (totalServiceRevenue >= 150000) {
      serviceIncentive = totalServiceRevenue * 0.05;
    } else if (totalServiceRevenue >= 100000) {
      serviceIncentive = totalServiceRevenue * 0.02;
    }

    let productIncentive = totalProductSalesCount * 30;

    res.status(200).json({
      success: true,
      data: {
        staff: staff.name,
        totalServiceRevenue,
        totalProductSalesCount,
        serviceIncentive,
        productIncentive,
        totalIncentive: serviceIncentive + productIncentive
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
