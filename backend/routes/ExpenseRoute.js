const express = require("express");
const Expense = require("../models/Expense");
const User = require("../models/User");

const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { clerkId, amount, category, note } = req.body;

//     const expense = await Expense.create({
//       clerkId,
//       amount,
//       category,
//       note,
//     });

//     await User.findOneAndUpdate(
//       { clerkId },
//       {
//         $inc: {
//           totalExpense: amount,
//         },
//       }
//     );

//     res.json(expense);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:clerkId", async (req, res) => {
//   try {
//     const expenses = await Expense.find({
//       clerkId: req.params.clerkId,
//     }).sort({ createdAt: -1 });

//     res.json(expenses);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

// add expense 

router.post("/", async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    // update total expense in user
    await User.findOneAndUpdate(
      { clerkId: req.body.clerkId },
      {
        $inc: {
          totalExpense: req.body.amount,
        },
      }
    );

    res.json(expense);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// GET ALL EXPENSES
//

router.get("/:clerkId", async (req, res) => {
  try {
    const expenses = await Expense.find({
      clerkId: req.params.clerkId,
    }).sort({
      createdAt: -1,
    });

    res.json(expenses);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// DELETE EXPENSE
//

router.delete("/:id", async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense)
      return res.status(404).json({
        message: "Expense not found",
      });

    await User.findOneAndUpdate(
      {
        clerkId: expense.clerkId,
      },
      {
        $inc: {
          totalExpense: -expense.amount,
        },
      }
    );

    await Expense.findByIdAndDelete(req.params.id);

    res.json({
       message: "Deleted",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// UPDATE EXPENSE
//

router.put("/:id", async (req, res) => {
  try {
    const { amount, category, note } = req.body;

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    // Update user's totalExpense
    const difference = Number(amount) - expense.amount;

    await User.findOneAndUpdate(
      {
        clerkId: expense.clerkId,
      },
      {
        $inc: {
          totalExpense: difference,
        },
      }
    );

    // Update expense
    expense.amount = Number(amount);
    expense.category = category;
    expense.note = note;

    await expense.save();

    res.json({
      message: "Expense updated successfully",
      expense,
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;