const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Strip trailing slashes and support comma-separated origins
const allowedOrigins = CLIENT_URL.split(",")
  .map(url => url.trim().replace(/\/$/, ""));

// Add known deployment origins and local origins to ensure seamless operation
const additionalOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://astha-salon-management.vercel.app"
];

additionalOrigins.forEach(origin => {
  if (!allowedOrigins.includes(origin)) {
    allowedOrigins.push(origin);
  }
});

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      const cleanedOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(cleanedOrigin)) {
        return callback(null, true);
      }
      
      return callback(new Error(`Origin ${origin} not allowed by CORS`));
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

// Global error handler (must be after all routes)
const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

module.exports = app;