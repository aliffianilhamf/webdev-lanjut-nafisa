// Fungsi adalah sebuah blok kode yang dirancang untuk melakukan tugas tertentu. Fungsi biasanya digunakan untuk mengelompokkan kode yang dapat digunakan kembali, sehingga memudahkan pengelolaan dan pemeliharaan kode.
// Fungsi dapat menerima input dalam bentuk parameter dan dapat mengembalikan output. Fungsi juga dapat dipanggil berkali-kali di berbagai bagian program, sehingga mengurangi duplikasi kode dan meningkatkan efisiensi.

// Contoh Fungsi Sederhana
function luasSegitiga(alas, tinggi) {
  return (alas * tinggi) / 2;
}

// memanggil fungsi
let alas = 10;
let tinggi = 5;
let luas = luasSegitiga(alas, tinggi);
console.log(
  `Luas segitiga dengan alas ${alas} dan tinggi ${tinggi}  adalah: ${luas}`,
);

// Alas prisma segitiga dapat dihitung dengan rumus luas segitiga. Berikut adalah contoh fungsi untuk menghitung luas alas prisma segitiga:

let alasPrisma = luasSegitiga(10, 5);
console.log(`Luas alas prisma segitiga adalah: ${luasSegitiga(20, 5)}`);

// volume prisma segitiga dapat dihitung dengan rumus volume = luas alas * tinggi prisma. Berikut adalah contoh fungsi untuk menghitung volume prisma segitiga:

let tinggiPrisma = 8;
let volumePrisma = luasSegitiga(16, 5) * tinggiPrisma;

// fungsi dengan tipe void (tidak mengembalikan nilai)
function cetakLuasSegitiga(alas, tinggi) {
  let luas = (alas * tinggi) / 2;
  console.log(
    `Luas segitiga dengan alas ${alas} dan tinggi ${tinggi} adalah: ${luas}`,
  );
}

// memanggil fungsi void
cetakLuasSegitiga(10, 5);

// let hasil2 = cetakLuasSegitiga(10, 5); // ndak boleh
// console.log(`Hasilnya : ${cetakLuasSegitiga(10, 5)}`); // ndak boleh

// Latihan Soal fungsi
// 1. tipe void tidak dengan parameter

/**
 * buatlah sebuah fungsi dengan tipe void yang tidak menerima parameter dan tidak mengembalikan nilai. Fungsi ini akan mencetak "Hello, Saya mulai belajar javascript!" ke konsol.
 */

// 2. tipe void dengan parameter

/**
 * buatlah sebuah fungsi dengan tipe void yang menerima parameter berupa nama. Fungsi ini akan mencetak "Hello, [nama]!" ke konsol.
 */

// 3. tipe return dengan parameter

/**
 * buatlah sebuah fungsi dengan tipe return yang menerima parameter berupa angka. Fungsi ini akan mengembalikan hasil perkalian angka tersebut dengan 2.
 */

// 4. tipe return tanpa parameter

/**
 * buatlah sebuah fungsi dengan tipe return yang tidak menerima parameter. Fungsi ini akan mengembalikan string "Belajar JavaScript itu menyenangkan!".
 */
