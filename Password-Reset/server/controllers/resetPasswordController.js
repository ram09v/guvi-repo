const crypto = require("crypto");
const User = require("../models/User");

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resettoken)
      .digest("hex");

    const user = await User.findOne({ resetPasswordToken }).select("+password");

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid token" });
    }

    if (user.resetPasswordExpire < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Token has expired" });
    }

    const isSamePassword = await user.matchPassword(req.body.password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message:
          "Your new password cannot be the same as your current password.",
      });
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      data: "Password Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = resetPassword;