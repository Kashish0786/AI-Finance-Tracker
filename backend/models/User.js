const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    name: String,

    email: String,

    monthlyIncome: {
      type: Number,
      default: 0,
    },

    monthlyBudget: {
      type: Number,
      default: 0,
    },

    savingsGoal: {
      type: Number,
      default: 0,
    },
     totalExpense: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);