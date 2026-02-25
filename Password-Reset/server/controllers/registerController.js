const User = require("../models/User");

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please include all fields" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const user = await User.create({ username, email, password });
  if (user) {
    res.status(201).json({
      success: true,
      token: generateToken(user._id),
      message: "User registered successfully",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

module.exports = registerUser;