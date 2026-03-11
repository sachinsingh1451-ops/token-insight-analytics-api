const axios = require("axios");

const BASE_URL = "https://api.coingecko.com/api/v3";

async function getTokenData(id, days = 30) {
  const tokenRes = await axios.get(`${BASE_URL}/coins/${id}`);

  const chartRes = await axios.get(
    `${BASE_URL}/coins/${id}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days
      }
    }
  );

  const token = tokenRes.data;

  return {
    id: token.id,
    symbol: token.symbol,
    name: token.name,
    market_data: {
      current_price_usd: token.market_data.current_price.usd,
      market_cap_usd: token.market_data.market_cap.usd,
      total_volume_usd: token.market_data.total_volume.usd,
      price_change_percentage_24h:
        token.market_data.price_change_percentage_24h
    },
    history: chartRes.data.prices
  };
}

module.exports = { getTokenData };
