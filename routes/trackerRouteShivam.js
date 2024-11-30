// routes/expenses.js
// @ts-nocheck
const express = require("express");
const Tracker = require("../models/Tracker");
const router = express.Router();

// Get all expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Tracker.find();
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new expense
router.post("/", async (req, res) => {
  const { name, amount, category, date } = req.body;

  const expense = new Tracker({
    name,
    amount,
    category,
    date,
  });

  try {
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an expense
router.put("/:id", async (req, res) => {
  const { name, amount, category, date } = req.body;

  try {
    const expense = await Tracker.findByIdAndUpdate(
      req.params.id,
      {
        name,
        amount,
        category,
        date,
      },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an expense
router.delete("/:id", async (req, res) => {
  try {
    const expense = await Tracker.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
