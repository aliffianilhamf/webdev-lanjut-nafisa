const http = require("http");

// buat servernya
const server = http.createServer(function (req, res) {
  const url = req.url;

  if (url === "/") {
    res.end("Selamat Datang di Server Saya!");
  } else if (url === "/stok") {
    res.end(`Data Stok Barang`);
  } else if (url === "/laporan") {
    res.end(`Data Laporan`);
  } else {
    res.statusCode = 404;
    res.end(`Halaman Tidak Ditemukan`);
  }
});

// jalankan servernya
server.listen(3000, function () {
  console.log("Server berjalan di http://localhost:3000");
});

// bedanya sama dengan 1, 2, dan 3

// sama dengan 1 itu digunakan untuk melakukan operator assignment
let data = 10;

// sama dengan 2, itu digunakan untuk melakukan operator perbandingan dari sisi konten (isi) data, bukan tipe datanya. Jadi jika tipe datanya berbeda, maka akan dilakukan konversi tipe data terlebih dahulu sebelum dibandingkan. Contohnya:
let a = 10; // number
let b = "10"; // string

console.log(a == b); // true, karena nilai kontennya sama setelah konversi tipe data

// sama dengan 3, itu digunakan untuk melakukan operator perbandingan dari sisi konten (isi) data dan tipe datanya. Jadi jika tipe datanya berbeda, maka akan langsung dianggap tidak sama. Contohnya:
let c = 10; // number
let d = "10"; // string

console.log(c === d); // false, karena tipe datanya berbeda (number vs string)
