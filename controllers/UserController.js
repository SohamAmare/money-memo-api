// @ts-nocheck

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(1);
  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });

    console.log(2);
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    console.log(3);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(4);
    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { registerUser, loginUser };
