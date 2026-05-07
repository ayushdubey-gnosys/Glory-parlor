// routes/authRoutes.js

const express = require("express");

const router = express.Router();

const {
  register,
} = require("../controllers/auth/register");

const {
  login,
} = require("../controllers/auth/login");

const {
  logout,
} = require("../controllers/auth/logout");

const {
  me,
} = require("../controllers/auth/me");

const {
  protect,
} = require("../middleware/authMiddleware");

// REGISTER

router.post(
  "/register",
  register
);

// LOGIN

router.post(
  "/login",
  login
);

// LOGOUT

router.post(
  "/logout",
  protect,
  logout
);

// CURRENT USER

router.get(
  "/me",
  protect,
  me
);

module.exports = router;