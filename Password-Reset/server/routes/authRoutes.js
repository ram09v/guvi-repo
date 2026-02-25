const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { protect } = require('../middleware/authMiddleware');

const {
  registerUser,
  loginUser,
  currentUser,
  forgotPassword,
  verifyResetToken,
  resetPassword,
} = require("../controllers/authController");

const forgotPasswordLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: {
        success: false,
        message: 'Too many password reset requests from this IP. Please try again after 15 minutes.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/currentUser", protect, currentUser);
router.post("/forgotpassword", forgotPasswordLimiter, forgotPassword);
router.get("/resetpassword/:resettoken", verifyResetToken);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;