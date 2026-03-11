const request = require("supertest");
const express = require("express");

const tokenRoutes = require("../src/routes/tokenRoutes");

jest.mock("../src/services/coingeckoService", () => ({
  getTokenData: jest.fn()
}));

jest.mock("../src/services/aiService", () => ({
  getTokenInsight: jest.fn()
}));

const { getTokenData } = require("../src/services/coingeckoService");
const { getTokenInsight } = require("../src/services/aiService");

const app = express();
app.use(express.json());
app.use("/api/token", tokenRoutes);

describe("Token Routes", () => {

  test("should return token insight", async () => {

    getTokenData.mockResolvedValue({
      name: "Bitcoin",
      market_data: {
        current_price_usd: 60000,
        market_cap_usd: 1000000000,
        total_volume_usd: 50000000,
        price_change_percentage_24h: 2.5
      }
    });

    getTokenInsight.mockResolvedValue({
      reasoning: "Strong market momentum",
      sentiment: "Bullish"
    });

    const res = await request(app)
      .post("/api/token/bitcoin/insight")
      .send({ history_days: 30 });

    expect(res.status).toBe(200);
    expect(res.body.token.name).toBe("Bitcoin");
    expect(res.body.insight.sentiment).toBe("Bullish");
  });

  test("should handle service error", async () => {

    getTokenData.mockRejectedValue(new Error("API failure"));

    const res = await request(app)
      .post("/api/token/bitcoin/insight");

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Failed to generate insight");
  });

});
