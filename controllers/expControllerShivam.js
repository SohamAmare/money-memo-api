// controllers/expenseController.js
//@ts-nocheck
const Expense = require("../models/ExpenseShivam");
// const User = require("../models/ExpenseShivam");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.splitExpense = async (req, res) => {
  const { totalAmount, members, splitType } = req.body;

  try {
    let splitResult;

    if (splitType === "pair") {
      // Ensure there are exactly two members
      if (members.length !== 2) {
        return res.status(400).json({
          error: "Exactly two members are required for pair splitting.",
        });
      }
      const halfShare = totalAmount / 2;
      splitResult = [
        { member: members[0], share: halfShare.toFixed(2) },
        { member: members[1], share: halfShare.toFixed(2) },
      ];
    } else if (splitType === "group") {
      const individualShare = totalAmount / members.length;
      splitResult = members.map((member) => ({
        member,
        share: individualShare.toFixed(2),
      }));
    } else {
      return res.status(400).json({ error: "Invalid split type." });
    }

    // Save the expense data in the database
    const newExpense = new Expense({
      totalAmount,
      members,
      splitType,
      splitResult,
    });
    await newExpense.save();

    res
      .status(201)
      .json({ message: "Expenses split successfully", splitResult });
  } catch (error) {
    res.status(500).json({ error: "Error while splitting expenses" });
  }
};

exports.getPastSplits = async (req, res) => {
  try {
    const pastSplits = await Expense.find().sort({ createdAt: -1 }); // Retrieve and sort by the most recent splits
    res.status(200).json(pastSplits);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving past splits" });
  }
};

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token if login is successful
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};
