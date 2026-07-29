// Promise adalah sebuah objek yang mewakili keberhasilan atau kegagalan dari sebuah operasi asynchronous. Promise memiliki tiga state: pending, fulfilled, dan rejected.

// contoh Promise Sederhana
function cekStokPromise(idBarang) {
  return new Promise(function (resolve, reject) {
    console.log(`Cek stok barang: ${idBarang}`);

    setTimeout(function () {
      let stok = Math.floor(Math.random() * 100); // stok random antara 0-99

      // cek apakah stok tersedia
      if (stok > 0) {
        // berhasil, resolve dengan data stok
        resolve({ id: idBarang, stok: stok });
      } else {
        // gagal, reject dengan error
        reject(new Error(`Stok barang dengan ID ${idBarang} habis`));
      }
    }, 5000); // delay 5 detik
  });
}

// memanggil fungsi cekStokPromise dengan then dan catch
cekStokPromise(1234)
  .then(function (hasil) {
    console.log(`Stok barang dengan ID ${hasil.id} adalah: ${hasil.stok}`);

    return cekStokPromise(5678); // memanggil lagi untuk barang lain
  })
  .then(function (hasil) {
    console.log(`Stok barang dengan ID ${hasil.id} adalah: ${hasil.stok}`);
  })
  .catch(function (error) {
    console.error("Terjadi kesalahan:", error.message);
  });
