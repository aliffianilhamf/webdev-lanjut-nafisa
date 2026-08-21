require("dotenv").config();
// 1. import express
const express = require("express");
const connectDB = require("./database/db");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const stockTransactionRoutes = require("./routes/stockTransactionRoutes");

// 2. buat app express
const app = express();
const PORT = process.env.PORT || 3000;

// 3. middleware untuk parsing json
app.use(express.json());

// 4. koneksi ke database
connectDB();

// 5. route
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/stock-transactions", stockTransactionRoutes);

// 6. jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
