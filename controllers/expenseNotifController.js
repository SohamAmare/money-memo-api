// @ts-nocheck

const { default: mongoose } = require("mongoose");
const ExpenseNotif = require("../models/expenseNotifModel");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const { sendSmsNotification } = require("./notifService");

exports.getMonthlyExpenses = async (req, res) => {
  try {
    const userId = req.user; // Get userId from the request
    console.log("syaam", userId);
    // Convert the userId to an ObjectId properly
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const months = {};
    const expense = await ExpenseNotif.find({ userId });
    console.log(expense);

    expense.map((user) => {
      console.log(String(user.dueDate).split(" ")[1]);
      const temp = months[String(user.dueDate).split(" ")[1]] || 0;
      months[String(user.dueDate).split(" ")[1]] = temp + user.amount;
    });
    console.log(months);
    res.json(months);
  } catch (error) {
    console.error(error); // Log any errors for debugging
    res.status(500).json({ error: error.message });
  }
};

exports.createExpenseForNotif = async (req, res) => {
  try {
    const { description, amount, dueDate, isRecurring } = req.body;
    console.log(req.body);
    const userId = req.user; // Get userId from the middleware

    // Use your correct phone number in E.164 format
    const userPhoneNumber = "+917045054597"; // Add '+' and country code for India

    const expense = new ExpenseNotif({
      description,
      amount,
      dueDate,
      isRecurring,
      userId,
    });

    await expense.save(); // Save the expense to the database

    // Send an immediate SMS notification
    const message = `Your expense '${description}' of amount ${amount} is created. Due date is ${dueDate}.`;
    await sendSmsNotification(userPhoneNumber, message); // Send the immediate SMS

    // If the expense is recurring, schedule the notification
    if (isRecurring) {
      scheduleRecurringNotification(expense, userPhoneNumber); // Schedule the recurring notification
    }

    res.status(201).json(expense); // Respond with the created expense
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ error: err.message });
  }
};

// In expenseNotifController.js
// exports.getMonthlyExpenses = async (req, res) => {
//   try {
//     const userId = req.user; // Assuming you have user authentication middleware
//     const expenses = await ExpenseNotif.aggregate([
//       { $match: { userId } },
//       {
//         $group: {
//           _id: { $month: "$dueDate" }, // Group by month
//           totalAmount: { $sum: "$amount" }, // Sum up the amounts
//         },
//       },
//       { $sort: { _id: 1 } }, // Sort by month
//     ]);

//     console.log("hvsbker", expenses);

//     // Map the results to a more usable format
//     const formattedExpenses = expenses.map((expense) => ({
//       month: expense._id,
//       totalAmount: expense.totalAmount,
//     }));

//     res.status(200).json(formattedExpenses);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.createExpenseForNotif = async (req, res) => {
//   try {
//     const { description, amount, dueDate, isRecurring } = req.body;
//     // console.log(req.body);
//     const userId = req.user; // Get userId from the middleware
//     // console.log(description, amount, dueDate, isRecurring);
//     const userPhoneNumber = "+917045054597";
//     const expense = new ExpenseNotif({
//       // Create a new instance of ExpenseNotif
//       description,
//       amount,
//       dueDate,
//       isRecurring,
//       userId,
//     });

//     await expense.save(); // Save the expense to the database

//     await sendSmsNotification(userPhoneNumber, message);

//     if (isRecurring) {
//       scheduleRecurringNotification(expense, userPhoneNumber); // Assuming this function exists
//     }

//     res.status(201).json(expense); // Respond with the created expense
//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getAllExpenses = async (req, res) => {
  try {
    const userId = req.user;
    console.log("SOHAM");
    console.log("Fetching expenses for user: ", userId);
    const expenses = await ExpenseNotif.find({ userId });
    console.log("SOHAM AMARE");
    console.log("Expenses found: ", expenses);
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await ExpenseNotif.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const scheduleRecurringNotification = (expense, userPhoneNumber) => {
  const { dueDate, description, userId } = expense;

  // Get the day before the due date for notification
  const dayBefore = new Date(dueDate);
  dayBefore.setDate(dayBefore.getDate() - 1);

  cron.schedule(
    `0 9 ${dayBefore.getDate()} ${dayBefore.getMonth() + 1} *`, // Scheduled for 9 AM the day before
    async () => {
      console.log(
        `Reminder: Your payment for '${description}' is due tomorrow!`
      );

      // Define the SMS message
      const message = `Hello,\n\nThis is a friendly reminder that your payment for '${description}' is due tomorrow on ${dueDate.toDateString()}.\n\nThank you!`;

      // Send SMS using Twilio
      await sendSmsNotification(userPhoneNumber, message); // Call the Twilio function to send SMS
    }
  );
  console.log(
    `Recurring notification scheduled for '${expense.description}' on ${dueDate}`
  );
};

// above is the updated one
//this is working and main code for scheduleRecurringNotification function

// const scheduleRecurringNotification = (expense) => {
//   const { dueDate, description } = expense;

//   const dayBefore = new Date(dueDate);
//   dayBefore.setDate(dayBefore.getDate() - 1);

//   cron.schedule(
//     `0 9 ${dayBefore.getDate()} ${dayBefore.getMonth() + 1} *`,
//     () => {
//       console.log(
//         `Reminder: Your payment for '${description}' is due tomorrow!`
//       );
//       // Add code for sending email or SMS notification here
//     }
//   );
//   console.log(`Recurring notification scheduled for ${expense.description}`);
//   alert(`Recurring notification scheduled for ${expense.description}`);
// };

// const ExpNotifSchema = require("../models/expenseNotifModel");
// const cron = require("node-cron");
// const nodemailer = require("nodemailer");

// exports.createExpenseForNotif = async (req, res) => {
//   try {
//     const { description, amount, dueDate, isRecurring, userId } = req.body;
//     const expense = new ExpNotifSchema({
//       description,
//       amount,
//       dueDate,
//       isRecurring,
//       userId,
//     });
//     await expense.save();

//     if (isRecurring) scheduleRecurringNotification(expense);

//     res.status(201).json(expense);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const scheduleRecurringNotification = (expense) => {
//   const { dueDate, description } = expense;

//   const dayBefore = new Date(dueDate);
//   dayBefore.setDate(dayBefore.getDate() - 1);

//   cron.schedule(
//     `0 9 ${dayBefore.getDate()} ${dayBefore.getMonth() + 1} *`,
//     () => {
//       console.log(
//         `Reminder: Your payment for '${description}' is due tomorrow!`
//       );
//       //Here you can send an email or SMS notification
//     }
//   );
//   console.log(`Recurrent notification scheduled for ${expense.description}`);
// };
