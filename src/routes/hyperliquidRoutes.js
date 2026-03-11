const express = require("express");
const router = express.Router();

const { getWalletTrades } = require("../services/hyperliquidService");
const { calculateDailyPnL } = require("../utils/pnlCalculator");
const { MESSAGES } = require("../constants/messages");

router.get("/:wallet/pnl", async (req, res) => {
  try {
    const { wallet } = req.params;
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({
        error: MESSAGES.MISSING_DATES
      });
    }

    const trades = await getWalletTrades(wallet);

    const daily = calculateDailyPnL(trades, start, end);

    const summary = daily.reduce(
      (acc, d) => {
        acc.total_realized_usd += d.realized_pnl_usd;
        acc.total_unrealized_usd += d.unrealized_pnl_usd;
        acc.total_fees_usd += d.fees_usd;
        acc.total_funding_usd += d.funding_usd;
        acc.net_pnl_usd += d.net_pnl_usd;
        return acc;
      },
      {
        total_realized_usd: 0,
        total_unrealized_usd: 0,
        total_fees_usd: 0,
        total_funding_usd: 0,
        net_pnl_usd: 0
      }
    );

    res.json({
      wallet,
      start,
      end,
      daily,
      summary,
      diagnostics: {
        data_source: MESSAGES.DATA_SOURCE,
        last_api_call: new Date().toISOString(),
        notes: MESSAGES.CALCULATION_NOTE
      }
    });
  } catch (err) {
    res.status(500).json({
      error: MESSAGES.FETCH_ERROR,
      message: err.message
    });
  }
});

module.exports = router;
