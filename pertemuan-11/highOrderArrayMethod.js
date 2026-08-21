const hargaBarang = [10000, 25000, 50000];
// Beri diskon 10%
const hargaDiskon = hargaBarang.map((harga) => harga - harga * 0.1);

console.log(hargaDiskon); // [9000, 22500, 45000]

// latihan soal
// diberikan array angka, buatlah array baru yang berisi angka-angka yang dikalikan 2
const angka = [1, 2, 3, 4, 5];
const result = angka.map((num) => num * 2);
console.log(result);
// harapan output: [2, 4, 6, 8, 10]

// latihan soal 2
// diberikan array angka, buatlah array baru yang berisi angka-angka yang dikalikan 2, tapi hanya untuk angka genap saja
const angka2 = [1, 2, 3, 4, 5];
const result2 = angka2.map((num) => (num % 2 === 0 ? num * 2 : num));
console.log(result2);
// harapan output: [1, 4, 3, 8, 5]

console.log("\nFilter");
const angka3 = [10, 5, 20, 15, 8];
// Ambil angka yang lebih dari 10
const diAtasSepuluh = angka3.filter((a) => a > 10);

console.log(diAtasSepuluh); // [20, 15]
