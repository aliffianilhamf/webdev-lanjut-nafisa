// include modulenya dulu
const http = require("http");

// buat servernya
const server = http.createServer(function (req, res) {
  // req : permintaan dari client
  // res : respon dari server

  // set header
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  // set body
  res.end(`Hello World! dari Server ERP`);
});

// jalankan servernya
server.listen(3000, function () {
  console.log("Server berjalan di http://localhost:3000");
});

// Latihan membuat server dengan http module
// 1. Buatlah server yang menampilkan "Selamat Datang di Server Saya!" ketika diakses melalui browser.
// 2. Buatlah server yang menampilkan "Server Saya Sedang Sibuk, Silakan Coba Lagi Nanti!" ketika diakses melalui browser.
// 3. Buatlah server yang menampilkan "Server Saya Sedang Dalam Perbaikan, Silakan Coba Lagi Nanti!" ketika diakses melalui browser.
// 4. Buatlah server yang menampilkan "Server Saya Sedang Dalam Perbaikan, Silakan Coba Lagi Nanti!" ketika diakses melalui browser.
// 5. jalankan di port 4000, 5000
