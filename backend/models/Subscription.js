const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      index: true,
    },

    appName: {
      type: String,
      required: true,
    },

    plan: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    billingCycle: {
      type: String,
      enum: ["Monthly", "Quarterly", "Yearly"],
      default: "Monthly",
    },

    nextBillingDate: {
      type: Date,
      required: true,
    },

    autoRenew: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["Active", "Cancelled"],
      default: "Active",
    },

    logo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Subscription",
  subscriptionSchema
);