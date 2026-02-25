const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (user && (await user.matchPassword(password))) {
    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

module.exports = loginUser;