require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();
const express = require("express");
const connectDB = require("./databases/db");
const bookRoutes = require("./routes/bookRoutes");

// membuat instance dari express
const app = express();

// mengatur port server
const PORT = process.env.PORT || 3000;

// koneksi ke database
connectDB();

// middleware untuk parsing request body
app.use(express.json());

// routing
app.use("/api/books", bookRoutes);

// jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
