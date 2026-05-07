// middleware/authMiddleware.js

const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");

// VERIFY LOGIN

exports.protect = async (
  req,
  res,
  next
) => {
  try {
    let token = null;

    // TOKEN FROM COOKIE

    if (req.cookies?.token) {
      token = req.cookies.token;
    }

    // TOKEN FROM HEADER

    if (
      !token &&
      req.headers.authorization?.startsWith(
        "Bearer"
      )
    ) {
      token =
        req.headers.authorization.split(
          " "
        )[1];
    }

    // TOKEN NOT FOUND

    if (!token) {
      return res.status(401).json({
        message:
          "Not authorized, token missing",
      });
    }

    // VERIFY TOKEN

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // FIND USER

    const user =
      await userModel.findById(
        decoded.id
      );

    if (!user) {
      return res.status(401).json({
        message:
          "User not found",
      });
    }

    // SAVE USER IN REQUEST

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      message:
        "Invalid or expired token",

      error: err.message,
    });
  }
};

// ROLE BASED ACCESS

exports.authorize = (...roles) => {
  return (req, res, next) => {
    // CHECK ROLE

    if (
      !roles.includes(req.user.role)
    ) {
      return res.status(403).json({
        message:
          "Access denied",
      });
    }

    next();
  };
};