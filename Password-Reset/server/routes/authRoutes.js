const express = require("express");
const router = express.Router();
const {
  registerUser,
  forgotPassword,
  verifyResetToken,
  resetPassword,
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/forgotpassword", forgotPassword);
router.get("/resetpassword/:resettoken", verifyResetToken);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;