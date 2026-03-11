const express = require("express");
const router = express.Router();

const { getTokenData } = require("../services/coingeckoService");
const { getTokenInsight } = require("../services/aiService");

router.post("/:id/insight", async (req, res) => {
  try {
    const { id } = req.params;
    const { vs_currency = "usd", history_days = 30 } = req.body;

    const tokenData = await getTokenData(id, history_days);

    const prompt = `
Analyze the following crypto token market data and return JSON.


PricToken: ${tokenData.name}e: ${tokenData.market_data.current_price_usd}
Market Cap: ${tokenData.market_data.market_cap_usd}
Volume: ${tokenData.market_data.total_volume_usd}
24h Change: ${tokenData.market_data.price_change_percentage_24h}

Return JSON format:
{
 "reasoning": "...",
 "sentiment": "Bullish | Bearish | Neutral"
}
`;

    const insight = await getTokenInsight(prompt);

    res.json({
      source: "coingecko",
      token: tokenData,
      insight,
      model: {
        provider: "openai",
        model: process.env.AI_MODEL
      }
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to generate insight",
      message: error.message
    });
  }
});

module.exports = router;
