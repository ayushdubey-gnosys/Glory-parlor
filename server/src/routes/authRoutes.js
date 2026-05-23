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
const { updateProfile } = require("../controllers/auth/updateProfile");
const { changePassword } = require("../controllers/auth/changePassword");

const {
  protect,
} = require("../middleware/authMiddleware");
const  upload = require("../middleware/uploadMiddleware");


// REGISTER

// accept `profilePic` field name to match client form
router.post(
  "/register",
  upload.single("profilePic"),
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

// UPDATE PROFILE (authenticated user)
router.patch(
  "/profile",
  protect,
  upload.single("profilePic"),
  updateProfile
);

// CHANGE PASSWORD (authenticated user)
router.patch(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;