require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const categoryRoutes = require("./src/routes/categoryRoutes");
const productRoutes = require("./src/routes/productRoutes");
const stockTransactionRoutes = require("./src/routes/stockTransactionRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/stock-transactions", stockTransactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
