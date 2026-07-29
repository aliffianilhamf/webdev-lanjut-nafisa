// 1. Import - ambil library express
const express = require("express");

// 2. Inisialisasi - buat instance dari express
const app = express();

// 3. port - tentukan port yang akan digunakan
const PORT = 3000;

// 4. middleware - gunakan middleware untuk parsing JSON
app.use(express.json());

// 5. routes - definisikan endpoint API
app.get("/", (req, res) => {
  res.send("Hello World! dari Server ERP");
});

app.get("/about", (req, res) => {
  res.send("Ini adalah halaman about");
});

app.post("/data", (req, res) => {
  const data = req.body;
  console.log("Data diterima:", data);
  res.json({
    message: "Data diterima",
    data: data,
  });

  return res.status(200).json({ message: "Data diterima", data: data });
});

// 6. jalankan server - listen pada port yang telah ditentukan
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
