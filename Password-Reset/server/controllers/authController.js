const asyncHandler = require("express-async-handler");
const registerUser = require("./registerController");
const loginUser = require("./loginController");
const currentUser = require("./currentUserController");
const forgotPassword = require("./forgotPasswordController");
const verifyResetToken = require("./verifyResetTokenController");
const resetPassword = require("./resetPasswordController");

module.exports = {
  registerUser: asyncHandler(registerUser),
  loginUser: asyncHandler(loginUser),
  currentUser: asyncHandler(currentUser),
  forgotPassword: asyncHandler(forgotPassword),
  verifyResetToken: asyncHandler(verifyResetToken),
  resetPassword: asyncHandler(resetPassword),
};