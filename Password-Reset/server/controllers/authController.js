const asyncHandler = require("express-async-handler");
const registerUser = require("./registerController");
const forgotPassword = require("./forgotPasswordController");
const verifyResetToken = require("./verifyResetTokenController");
const resetPassword = require("./resetPasswordController");

module.exports = {
  registerUser: asyncHandler(registerUser),
  forgotPassword: asyncHandler(forgotPassword),
  verifyResetToken: asyncHandler(verifyResetToken),
  resetPassword: asyncHandler(resetPassword),
};