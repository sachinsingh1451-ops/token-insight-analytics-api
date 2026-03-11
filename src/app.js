require("dotenv").config();
const express = require("express");

const tokenRoutes = require("./routes/tokenRoutes");
const hyperRoutes = require("./routes/hyperliquidRoutes");

const app = express();

app.use(express.json());

app.use("/api/token", tokenRoutes);
app.use("/api/hyperliquid", hyperRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
