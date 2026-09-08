const express = require("express");
const Subscription = require("../models/Subscription");

const router = express.Router();

//
// ADD SUBSCRIPTION
//

router.post("/", async (req, res) => {
  try {
    const subscription = await Subscription.create(req.body);

    res.json(subscription);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// GET ALL SUBSCRIPTIONS
//

router.get("/:clerkId", async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      clerkId: req.params.clerkId,
    }).sort({
      nextBillingDate: 1,
    });

    res.json(subscriptions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// UPDATE SUBSCRIPTION
//

router.put("/:id", async (req, res) => {
  try {
    const updated = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

//
// DELETE SUBSCRIPTION
//

router.delete("/:id", async (req, res) => {
  try {
    await Subscription.findByIdAndDelete(req.params.id);

    res.json({
      message: "Subscription Deleted",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;