const axios = require("axios");

const BASE_URL = "https://api.hyperliquid.xyz";

async function getWalletTrades(wallet) {
  const res = await axios.post(`${BASE_URL}/info`, {
    type: "userFills",
    user: wallet
  });

  return res.data;
}

module.exports = { getWalletTrades };
