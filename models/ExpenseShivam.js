const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  totalAmount: Number,
  members: [String],
  splitType: String,
  splitResult: Array,
});

const Expense = mongoose.model("Expense", ExpenseSchema);

module.exports = Expense;
