# Crypto Insight API

An AI-powered crypto analysis platform with token insights and HyperLiquid wallet analytics.

## Features

✅ CoinGecko integration  
✅ AI insight generation using OpenAI  
✅ HyperLiquid wallet PnL tracking  
✅ Error handling & validation  
✅ Modular architecture  
✅ Environment-based configuration  
✅ Clean, production-level API responses  

## Project Structure

```
crypto-insight-api/
├── src/
│   ├── routes/
│   │   ├── tokenRoutes.js
│   │   └── hyperliquidRoutes.js
│   ├── services/
│   │   ├── coingeckoService.js
│   │   ├── aiService.js
│   │   └── hyperliquidService.js
│   ├── utils/
│   │   └── pnlCalculator.js
│   └── app.js
├── .env.example
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the repository** (or extract project files)
```bash
cd crypto-insight-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env
```

4. **Add your API keys to `.env`**
```
PORT=3000
OPENAI_API_KEY=sk-...
AI_MODEL=gpt-4o-mini
```

5. **Start the server**
```bash
npm start
```

Server runs on `http://localhost:3000`

## API Endpoints

### Token Insight
**POST** `/api/token/:id/insight`

Analyzes crypto token market data using AI.

**Request:**
```json
{
  "vs_currency": "usd",
  "history_days": 30
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/api/token/chainlink/insight \
  -H "Content-Type: application/json" \
  -d '{"history_days": 30}'
```

**Response:**
```json
{
  "source": "coingecko",
  "token": {
    "id": "chainlink",
    "symbol": "link",
    "name": "Chainlink",
    "market_data": {
      "current_price_usd": 15.42,
      "market_cap_usd": 8000000000,
      "total_volume_usd": 400000000,
      "price_change_percentage_24h": 2.5
    },
    "history": [[timestamp, price], ...]
  },
  "insight": {
    "reasoning": "...",
    "sentiment": "Bullish"
  },
  "model": {
    "provider": "openai",
    "model": "gpt-4o-mini"
  }
}
```

### HyperLiquid PnL
**GET** `/api/hyperliquid/:wallet/pnl`

Fetches wallet profit/loss data from HyperLiquid.

**Query Parameters:**
- `start` (required) - Start date (YYYY-MM-DD)
- `end` (required) - End date (YYYY-MM-DD)

**Example:**
```bash
curl "http://localhost:3000/api/hyperliquid/0xabc123/pnl?start=2025-08-01&end=2025-08-03"
```

**Response:**
```json
{
  "wallet": "0xabc123",
  "start": "2025-08-01",
  "end": "2025-08-03",
  "daily": [
    {
      "date": "2025-08-01",
      "realized_pnl_usd": 500,
      "unrealized_pnl_usd": 200,
      "fees_usd": -50,
      "funding_usd": 10,
      "net_pnl_usd": 660,
      "equity_usd": 0
    }
  ],
  "summary": {
    "total_realized_usd": 1200,
    "total_unrealized_usd": 500,
    "total_fees_usd": -150,
    "total_funding_usd": 30,
    "net_pnl_usd": 1580
  },
  "diagnostics": {
    "data_source": "hyperliquid_api",
    "last_api_call": "2025-08-03T15:30:45.123Z",
    "notes": "PnL calculated using daily close prices"
  }
}
```

## Development

Run with auto-reload (requires nodemon):
```bash
npm run dev
```

## Tech Stack

- **Framework:** Express.js
- **HTTP Client:** Axios
- **AI/ML:** OpenAI API
- **Data Sources:** CoinGecko API, HyperLiquid API
- **Config:** dotenv

## Error Handling

All endpoints include try-catch blocks with meaningful error messages:

```json
{
  "error": "Failed to generate insight",
  "message": "API key invalid"
}
```

## License

ISC
