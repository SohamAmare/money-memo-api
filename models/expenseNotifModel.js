const mongoose = require("mongoose");

const expenseNotifSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  //here i made a change
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true, // Add this so each expense is tied to a user
  },
});

const ExpenseNotif = mongoose.model("ExpenseNotif", expenseNotifSchema);

module.exports = ExpenseNotif;

// const mongoose = require("mongoose");

// const expenseNotifSchema = new mongoose.Schema({
//   description: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   dueDate: {
//     type: Date,
//     required: true,
//   },
//   isRecurring: {
//     type: Boolean,
//     default: false,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
// });

// const ExpNotifSchema = mongoose.model("ExpNotifSchema", expenseNotifSchema);

// module.exports = { expenseNotifSchema };
