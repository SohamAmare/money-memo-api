// @ts-nocheck

const express = require("express");
const dotenv = require("dotenv");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./utils/connect");
const UserRoute = require("./routes/UserRoute");
const ChartRoute = require("./routes/expenseNotifRoute");
const expenseNotifRoute = require("./routes/expenseNotifRoute");
const TrackerRouteShivam = require("./routes/trackerRouteShivam");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// app.use(cors());
app.use(
  cors({
    origin: [
      "https://money-memo-frontend.vercel.app/",
      "https://money-memo-frontend.vercel.app",
      "http://localhost:5173/",
      "http://localhost:5173",
    ], // Allow frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/user", UserRoute);
// app.use("/api/expenses", require("./routes/expenseNotifRoute"));
app.use("/api/chartexpenses", ChartRoute);
app.use("/api/expenses", TrackerRouteShivam);
app.use("/api", expenseNotifRoute);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
