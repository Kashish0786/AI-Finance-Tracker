const express = require("express");
const router = express.Router();

const Emi = require("../models/Emi");

// Get all EMIs of a user
router.get("/:userId", async (req, res) => {
  try {
    const emis = await Emi.find({
      userId: req.params.userId,
    }).sort({ dueDate: 1 });

    res.json(emis);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Add EMI
router.post("/", async (req, res) => {
  try {
    const emi = await Emi.create(req.body);
    res.status(201).json(emi);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Update EMI
router.put("/:id", async (req, res) => {
  try {
    const emi = await Emi.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!emi) {
      return res.status(404).json({
        message: "EMI not found",
      });
    }

    res.json(emi);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Delete EMI
router.delete("/:id", async (req, res) => {
  try {
    const emi = await Emi.findByIdAndDelete(req.params.id);

    if (!emi) {
      return res.status(404).json({
        message: "EMI not found",
      });
    }

    res.json({
      message: "EMI deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;