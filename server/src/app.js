const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (origin === CLIENT_URL) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// respond to preflight requests for all routes
// parse cookies before body parsing so controllers can read `req.cookies`
app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/billing", require("./routes/billingRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/inquiries", require("./routes/inquiryRoutes"));
app.use("/api/academy", require("./routes/academyRoutes"));
app.use("/api/marketing", require("./routes/marketingRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use( "/api/notifications", require("./routes/notificationRoutes"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});


module.exports = app;