require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
const UserRoutes = require("./routes/UserRoutes");
const ExpenseRoute = require("./routes/ExpenseRoute")
const SubscriptionRoutes = require("./routes/SubsciptionRoutes");
const ai = require("./routes/ai");
const emiRoutes = require("./routes/emiRoutes.js");
const { clerkMiddleware } = require("@clerk/express");

const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/users", UserRoutes);
app.use("/api/expenses", ExpenseRoute);
app.use("/api/subscriptions", SubscriptionRoutes);
app.use("/api/ai", ai)
app.use("/api/emi", emiRoutes);

connectDB();

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// });