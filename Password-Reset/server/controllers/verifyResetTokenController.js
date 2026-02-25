const User = require("../models/User");
const crypto = require("crypto");

const verifyResetToken = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({ resetPasswordToken });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Token is invalid." });
  }

  if (user.resetPasswordExpire < Date.now()) {
    return res
      .status(400)
      .json({ success: false, message: "Token has expired." });
  }

  res.status(200).json({ success: true, message: "Token is valid." });
};

module.exports = verifyResetToken;