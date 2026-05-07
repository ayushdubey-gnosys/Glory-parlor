// controllers/marketing/marketingController.js

exports.sendCampaign = async (req, res) => {
  const { message, customers } = req.body;

  // integrate WhatsApp API / SMS here
  res.json({ msg: "Campaign sent", count: customers.length });
};