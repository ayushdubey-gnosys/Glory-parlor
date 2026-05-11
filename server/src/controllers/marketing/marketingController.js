const customerModel = require("../../models/customer.model");

const notificationModel = require("../../models/notification.model");

require("dotenv").config();

const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

exports.sendCampaign = async (req, res) => {
  try {
    const { message, category, selectedCustomers } = req.body;

    // VALIDATION

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    let customers = [];

    // If caller provided explicit selected customer IDs, use them.
    if (typeof selectedCustomers !== "undefined") {
      if (!Array.isArray(selectedCustomers) || selectedCustomers.length === 0) {
        return res.status(400).json({ message: "selectedCustomers must be a non-empty array of customer IDs" });
      }

      customers = await customerModel.find({ _id: { $in: selectedCustomers } });
    } else {
      let filter = {};

      // CATEGORY FILTER
      if (category && category !== "all" && category !== "new") {
        filter.category = category;
      }

      // NEW CUSTOMERS (LAST 7 DAYS)
      if (category === "new") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        filter.createdAt = { $gte: sevenDaysAgo };
      }

      customers = await customerModel.find(filter);
    }

    // Build recipients list preserving requested order when IDs provided
    let recipients = customers;
    if (typeof selectedCustomers !== "undefined") {
      // preserve order of selectedCustomers array
      const byId = new Map(customers.map((c) => [String(c._id), c]));
      recipients = selectedCustomers.map((id) => byId.get(String(id))).filter(Boolean);
    }

    const sent = [];
    const skipped = [];

    // LOOP RECIPIENTS
    for (const customer of recipients) {
      // SEND WHATSAPP MESSAGE

      if (customer && customer.phone) {
        // normalize phone: strip non-digits
        const digits = String(customer.phone).replace(/\D/g, "");
        // basic validation: expect 10 digits (local Indian numbers)
        if (digits.length < 9) {
          skipped.push({ id: customer._id, phone: customer.phone, reason: "invalid phone" });
          continue;
        }

        const toNumber = `whatsapp:+91${digits.slice(-10)}`;
        try {
          await client.messages.create({
            body: message,

            from:
              process.env.TWILIO_WHATSAPP_NUMBER,

            to: toNumber,
          });

          console.log(`WhatsApp sent to ${toNumber} (customer ${customer._id})`);
          sent.push({ id: customer._id, phone: customer.phone, to: toNumber });
        } catch (err) {
          console.log(
            "WhatsApp Error:",
            err.message
          );
          skipped.push({ id: customer._id, phone: customer.phone, reason: err.message });
        }
      }

      // SAVE NOTIFICATION (only for selected/fetched customers)
      await notificationModel.create({
        title: "Marketing Campaign",
        message,
        customer: customer._id,
        type: "campaign",
      });
    }

    res.status(200).json({
      success: true,
      count: recipients.length,
      sent,
      skipped,
      message: "Campaign processed",
    });
  } catch (error) {
    console.log(
      "Campaign Error:",
      error.message
    );

    res.status(500).json({
      message: error.message,
    });
  }
};