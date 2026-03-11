require("dotenv").config();
const express = require("express");

const tokenRoutes = require("./routes/tokenRoutes");
const hyperRoutes = require("./routes/hyperliquidRoutes");

const app = express();

app.use(express.json());

// Middleware to log API details
app.use((req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const ip = req.ip;

  console.log(`\n========== API REQUEST ==========`);
  console.log(`Method: ${method}`);
  console.log(`URL: ${url}`);
  next();
});

app.use("/api/token", tokenRoutes);
app.use("/api/hyperliquid", hyperRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;