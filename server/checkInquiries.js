const mongoose = require("mongoose");
const inquiryModel = require("./src/models/inquiry.model");
require("dotenv").config();

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB!");
    const inquiries = await inquiryModel.find();
    console.log("All inquiries count:", inquiries.length);
    console.log(JSON.stringify(inquiries, null, 2));
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}
run();
