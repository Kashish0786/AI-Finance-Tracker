const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/subscription-insights", async (req, res) => {
  try {
    const { subscriptions } = req.body;

    const prompt = `
You are an expert financial advisor.

Analyze these subscriptions:

${JSON.stringify(subscriptions, null, 2)}

Return ONLY valid JSON.

{
  "totalSpending": "",
  "mostExpensive": {
    "appName": "",
    "plan": "",
    "amount": "",
    "billingCycle": ""
  },
  "cheapest": {
    "appName": "",
    "plan": "",
    "amount": "",
    "billingCycle": ""
  },
  "duplicateServices": "",
  "possibleSavings": "",
  "recommendations": "Write one complete sentence giving a personalized recommendation."
  }
Do not use markdown.
Do not use bullet points.
Do not return any text outside JSON.

Keep response under 120 words.
`;

    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-small-latest",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const insights = JSON.parse(
    response.data.choices[0].message.content
    );

    res.json(insights);

  } catch (err) {
    console.log(err.response?.data || err.message);

    res.status(500).json({
      message: "Failed to generate insights",
    });
  }
});

module.exports = router;