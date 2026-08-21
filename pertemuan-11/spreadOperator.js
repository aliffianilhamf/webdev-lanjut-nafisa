// menduplikasi dan menggabungkan array
const buahLokal = ["Mangga", "Pisang"];
const buahImpor = ["Apel", "Anggur"];

// Menggabungkan array (ES5 biasanya menggunakan .concat())
// Dengan Spread, kita tinggal menyebarkan elemen-elemen tersebut ke dalam array baru
const semuaBuah = [...buahLokal, "Jeruk", ...buahImpor];
console.log(semuaBuah);
// Output: ["Mangga", "Pisang", "Jeruk", "Apel", "Anggur"]

// menduplikasi dan menggabungkan objek
console.log("\n--- Menggabungkan Object ---");
const dataUser = { name: "Ali", age: 25 };
const dataPekerjaan = { job: "Programmer", company: "TechCorp" };

// Menggabungkan object sekaligus menambah/menimpa properti baru
const userProfile = {
  ...dataUser,
  ...dataPekerjaan,
  location: "Jakarta",
  age: 26, // Menimpa age dari dataUser (karena ditulis setelah ...dataUser)
};

console.log(userProfile);
/* Output:
{
  name: "Ali",
  job: "Programmer",
  company: "TechCorp",
  location: "Jakarta",
  age: 26
}
*/
