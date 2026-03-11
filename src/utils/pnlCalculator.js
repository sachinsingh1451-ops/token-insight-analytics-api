function calculateDailyPnL(trades, start, end) {
  const daily = {};

  trades.forEach(trade => {
    const date = new Date(trade.time).toISOString().slice(0, 10);

    if (!daily[date]) {
      daily[date] = {
        date,
        realized_pnl_usd: 0,
        unrealized_pnl_usd: 0,
        fees_usd: 0,
        funding_usd: 0,
        net_pnl_usd: 0,
        equity_usd: 0
      };
    }

    daily[date].realized_pnl_usd += trade.closedPnl || 0;
    daily[date].fees_usd += trade.fee || 0;
  });

  Object.values(daily).forEach(d => {
    d.net_pnl_usd =
      d.realized_pnl_usd +
      d.unrealized_pnl_usd -
      d.fees_usd +
      d.funding_usd;
  });

  return Object.values(daily);
}

module.exports = { calculateDailyPnL };
