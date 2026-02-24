const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

const forgotPassword = async (req, res) => {
  if (!req.body.email) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide an email address." });
  }

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "There is no user with that email" });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/resetpassword/${resetToken}`;
    const message = `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n${resetUrl}\n\n If you did not request this, please ignore this email and your password will remain unchanged.\n`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset",
        message,
      });

      res
        .status(200)
        .json({ success: true, data: "Password reset link sent to email." });
    } catch (emailError) {
      if (user) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
      }
      return res.status(500).json({
        success: false,
        message: "Error: Email could not be sent " + emailError.message,
      });
    }
  } catch (dbError) {
    console.error("Database/Server Error:", dbError);
    return res
      .status(500)
      .json({
        success: false,
        message: "An unexpected server error occurred.",
      });
  }
};

module.exports = forgotPassword;