const request = require("supertest");
const express = require("express");

const hyperRoutes = require("../src/routes/hyperliquidRoutes");

jest.mock("../src/services/hyperliquidService", () => ({
  getWalletTrades: jest.fn()
}));

jest.mock("../src/utils/pnlCalculator", () => ({
  calculateDailyPnL: jest.fn()
}));

const { getWalletTrades } = require("../src/services/hyperliquidService");
const { calculateDailyPnL } = require("../src/utils/pnlCalculator");

const app = express();
app.use(express.json());
app.use("/api/hyperliquid", hyperRoutes);

describe("Hyperliquid Routes", () => {

  test("should return 400 if start/end missing", async () => {
    const res = await request(app)
      .get("/api/hyperliquid/testwallet/pnl");

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("should return pnl summary", async () => {

    getWalletTrades.mockResolvedValue([{ trade: 1 }]);

    calculateDailyPnL.mockReturnValue([
      {
        realized_pnl_usd: 100,
        unrealized_pnl_usd: 50,
        fees_usd: 10,
        funding_usd: 5,
        net_pnl_usd: 135
      }
    ]);

    const res = await request(app)
      .get("/api/hyperliquid/testwallet/pnl?start=2024-01-01&end=2024-01-02");

    expect(res.status).toBe(200);

    expect(res.body.summary.total_realized_usd).toBe(100);
    expect(res.body.summary.total_unrealized_usd).toBe(50);
    expect(res.body.summary.net_pnl_usd).toBe(135);
  });

});
