// Kita ingin menerima berapa pun angka yang dimasukkan (tidak terbatas)
function hitungTotal(mataUang, ...angkaAngka) {
  // lihat tipe data dari angkaAngka
  //   console.log(typeof angkaAngka);
  let total = 0;
  for (let angka of angkaAngka) {
    total += angka;
  }
  return `Total: ${mataUang} ${total}`;
}

console.log(hitungTotal("Rp", 1000, 2000, 5000));
// Output: Total: Rp 8000

// rest pada object distructuring
console.log("Rest pada object destructuring");
const murid = { id: 1, nama: "Budi", nilai: 90, kelas: "A" };

// Mengambil "nama", lalu membungkus sisa propertinya ke dalam object "sisaData"
const { nama, ...sisaData } = murid;

console.log(nama); // "Budi"
console.log(sisaData); // { id: 1, nilai: 90, kelas: "A" }
