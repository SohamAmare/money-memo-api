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
    origin: "http://localhost:5173", // Frontend URL
  })
);
app.use(express.json());

app.use("/api", UserRoute);
app.use("/api/expenses", require("./routes/expenseNotifRoute"));
app.use("/api/chartexpenses", ChartRoute);
app.use("/api/expenses", TrackerRouteShivam);
app.use("/api", expenseNotifRoute);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const express = require("express");
// const app = express();

// // const { expenseRoute } = require("./routes/expenseNotifRoute");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./utils/connect");

// const PORT = 5000;

// connectDB();

// app.use(express.json());
// app.use(cors());

// app.use("/api/expenses", require("./routes/expenseNotifRoute"));

// app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
