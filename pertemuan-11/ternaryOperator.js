const nilaiUjian = 75;
let statusKelulusan;

// --- CARA LAMA (if...else) ---
if (nilaiUjian >= 70) {
  statusKelulusan = "Lulus";
} else {
  statusKelulusan = "Gagal";
}

// --- CARA BARU (Ternary Operator) ---
// Bisa langsung di-assign ke dalam variabel (sehingga bisa pakai const)
//                   (kondisi) ? (jika true) : (jika false)
const statusTernary = nilaiUjian >= 70 ? "Lulus" : "Gagal";

console.log(`Status Ujian: ${statusTernary}`);
