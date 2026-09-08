const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    
    category: {
      type: String,
      required: true,
    },


    note: {
      type: String,
      default: "",
    },

        date: {
      type: Date,
      default: Date.now,
    },


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);