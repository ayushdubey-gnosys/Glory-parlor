const Staff = require("../models/staff.model");

// Centralized service to calculate and apply incentives based on business rules
exports.calculateIncentives = async (staffId, invoiceAmount, productSalesCount, parlorId) => {
  try {
    const staff = await Staff.findOne({ _id: staffId, parlor: parlorId });
    if (!staff) {
      throw new Error("Staff not found");
    }

    // Rules:
    // Product Sale = ₹30 per product
    // Service Sale: 1 Lac = 2%, 1.5 Lac = 5%
    
    // Increment staff revenue tracker
    staff.revenueGenerated += invoiceAmount;
    
    let serviceCommission = 0;
    if (staff.revenueGenerated >= 150000) {
      serviceCommission = staff.revenueGenerated * 0.05;
    } else if (staff.revenueGenerated >= 100000) {
      serviceCommission = staff.revenueGenerated * 0.02;
    }

    let productCommission = productSalesCount * 30;

    staff.commission = serviceCommission + productCommission;
    await staff.save();

    return { 
      success: true, 
      commission: staff.commission, 
      revenue: staff.revenueGenerated 
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};
