const Loyalty = require("../../models/loyalty.model");

// Get Loyalty Profile
exports.getLoyaltyProfile = async (req, res) => {
  try {
    const loyalty = await Loyalty.findOne({ customer: req.params.customerId, parlor: req.user.parlor });
    if (!loyalty) return res.status(404).json({ success: false, message: "Loyalty profile not found" });
    res.status(200).json({ success: true, data: loyalty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Points/Wallet
exports.updateLoyalty = async (req, res) => {
  try {
    let loyalty = await Loyalty.findOne({ customer: req.params.customerId, parlor: req.user.parlor });
    if (!loyalty) {
      loyalty = new Loyalty({ customer: req.params.customerId, parlor: req.user.parlor });
    }
    
    if (req.body.pointsBalance !== undefined) loyalty.pointsBalance += req.body.pointsBalance;
    if (req.body.walletBalance !== undefined) loyalty.walletBalance += req.body.walletBalance;
    if (req.body.membershipPlan) loyalty.membershipPlan = req.body.membershipPlan;

    await loyalty.save();
    res.status(200).json({ success: true, data: loyalty });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
