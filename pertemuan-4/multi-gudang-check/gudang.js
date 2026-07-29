// gudang.js — Data dan fungsi simulasi 3 gudang

// Data stok awal tiap gudang
var dataGudang = {
  1: { nama: "Gudang Jakarta", lokasi: "Jakarta Utara", stok: 120 },
  2: { nama: "Gudang Surabaya", lokasi: "Surabaya Timur", stok: 85 },
  3: { nama: "Gudang Medan", lokasi: "Medan Barat", stok: 200 }
};

/**
 * Simulasi cek stok gudang dengan delay random
 * Mengembalikan Promise
 */
function cekGudang(idGudang) {
  return new Promise(function(resolve, reject) {
    var gudang = dataGudang[idGudang];
    
    if (!gudang) {
      reject("Gudang " + idGudang + " tidak ditemukan!");
      return;
    }
    
    // Simulasi delay jaringan (500-1500ms)
    var delay = 500 + Math.floor(Math.random() * 1000);
    
    console.log("[" + new Date().toLocaleTimeString() + "] Menghubungi " + gudang.nama + "...");
    
    setTimeout(function() {
      // 10% kemungkinan timeout
      if (Math.random() < 0.1) {
        reject("TIMEOUT: " + gudang.nama + " tidak merespons!");
        return;
      }
      
      resolve({
        id: idGudang,
        nama: gudang.nama,
        lokasi: gudang.lokasi,
        stok: gudang.stok,
        delay: delay
      });
    }, delay);
  });
}

module.exports = { cekGudang, dataGudang };
