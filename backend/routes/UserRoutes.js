const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/profile", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { 
        clerkId: req.body.clerkId 
      },
      req.body,
      {
        // new: true,
        returnDocument: "after",
        upsert: true,
      }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:clerkId", async (req, res) => {
  try {
    const user = await User.findOne({
      clerkId: req.params.clerkId,
    });

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/expense", async (req, res) => {
  try {
    const { clerkId, category, amount, note } = req.body;

    const user = await User.findOne({
      clerkId,
    });

    user.expenses.push({
      category,
      amount,
      note,
    });

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;