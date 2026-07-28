// Callback adalah sebuah fungsi yang dikirimkan sebagai argumen ke fungsi lain dan dipanggil setelah operasi tertentu selesai. Callback sering digunakan untuk menangani operasi asynchronous, seperti membaca file, melakukan permintaan HTTP, atau menunggu event tertentu.

// Contoh Callback Sederhana
function halo(nama, callback) {
  console.log(`Halo, ${nama}!`);
  callback();
}

function selamatDatang() {
  console.log("Selamat datang di dunia JavaScript!");
}

// memanggil fungsi dengan callback
halo("John", selamatDatang);

// contoh 2

function cekStok(idBarang, callback) {
  console.log(`Cek stok barang: ${idBarang}`);

  // simulasi opersi asynchronous dengan setTimeout
  setTimeout(function () {
    let hasil = { id: idBarang, stok: 50 };
    callback(null, hasil);
  }, 5000); // delay 2 detik
}

function cekStokCallback(error, data) {
  if (error) {
    console.error("Terjadi kesalahan:", error);
    return;
  }

  console.log(`Stok barang dengan ID ${data.id} adalah: ${data.stok}`);
}

// panggil fungsi cekStok dengan callback
cekStok(12345, cekStokCallback);

// contoh error handling dengan callback
function bacaDataGudang(idGudang, callback) {
  // simulasi gudang 3 error
  if (idGudang === 3) {
    callback(new Error("Gudang 3 sedang dalam perbaikan"), null);
    return;
  }

  setTimeout(function () {
    let hasil = { id: idGudang, nama: `Gudang ${idGudang}` };
    callback(null, hasil);
  }, 5000); // delay 5 detik
}

function cekGudangCallback(error, data) {
  if (error) {
    console.error("Terjadi kesalahan:", error.message);
    return;
  }

  console.log(`Data gudang dengan ID ${data.id} adalah: ${data.nama}`);
}

// panggil fungsi bacaDataGudang dengan callback
// bacaDataGudang(3, cekGudangCallback); // akan menampilkan error
bacaDataGudang(1, function (error, data) {
  if (error) {
    console.error("Terjadi kesalahan:", error.message);
    return;
  }

  console.log(`Data gudang dengan ID ${data.id} adalah: ${data.nama}`);
}); // akan menampilkan data gudang 1
