// cekSerial.js — Cek gudang berurutan (serial)

const { cekGudang } = require('./gudang');

console.log("=== SERIAL CHECK: MULAI ===\\n");
var waktuMulai = Date.now();

cekGudang(1)
  .then(function(hasil) {
    console.log("  -> " + hasil.nama + ": " + hasil.stok + " unit (" + hasil.delay + "ms)");
    return cekGudang(2);
  })
  .then(function(hasil) {
    console.log("  -> " + hasil.nama + ": " + hasil.stok + " unit (" + hasil.delay + "ms)");
    return cekGudang(3);
  })
  .then(function(hasil) {
    console.log("  -> " + hasil.nama + ": " + hasil.stok + " unit (" + hasil.delay + "ms)");
    var durasi = Date.now() - waktuMulai;
    console.log("\\n=== SELESAI (serial) dalam " + durasi + "ms ===");
  })
  .catch(function(err) {
    console.log("ERROR:", err);
  });
