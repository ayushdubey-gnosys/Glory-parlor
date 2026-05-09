// Load environment variables first
require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

// Connect to database, then start server
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
