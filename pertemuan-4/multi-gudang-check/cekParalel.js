// cekParalel.js — Cek gudang bersamaan (paralel)

const { cekGudang } = require('./gudang');

console.log("=== PARALEL CHECK: MULAI ===\\n");
var waktuMulai = Date.now();

// Jalankan semua Promise bersamaan
Promise.all([
  cekGudang(1),
  cekGudang(2),
  cekGudang(3)
])
  .then(function(hasilArray) {
    hasilArray.forEach(function(hasil) {
      console.log("  -> " + hasil.nama + ": " + hasil.stok + " unit (" + hasil.delay + "ms)");
    });
    
    var totalStok = 0;
    hasilArray.forEach(function(h) { totalStok += h.stok; });
    
    var durasi = Date.now() - waktuMulai;
    console.log("\\nTotal stok: " + totalStok + " unit");
    console.log("=== SELESAI (paralel) dalam " + durasi + "ms ===");
  })
  .catch(function(err) {
    console.log("Salah satu gudang gagal:", err);
  });
