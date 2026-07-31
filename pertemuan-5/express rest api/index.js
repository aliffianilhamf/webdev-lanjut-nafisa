// 1. panggil library express
const express = require("express");

// 2. inisialisasi express
const app = express();

// 3. tentukan port
const PORT = 3000;

// 4. middleware untuk parsing JSON
app.use(express.json());

let dataUsers = [
  { id: 1, name: "Alice", email: "alice@gmail.com" }, // indeeks 0
  { id: 2, name: "Bob", email: "bob@gmail.com" }, // indeks 1
  { id: 3, name: "Charlie", email: "charlie@gmail.com" }, // indeks 2
];
// 5. definisikan endpoint API
app.get("/api/users", (req, res) => {
  res.json(dataUsers);
});

// mendapatkan user berdasarkan id
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = dataUsers.find((user) => user.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.json({ message: "User tidak ditemukan" });
  }
});

// post --> digunakan untuk menambahkan data baru
app.post("/api/users", (req, res) => {
  // dapatkan data dari body request
  const { nama, eml } = req.body;

  if (!nama || !eml) {
    return res.json({ message: "Name dan email harus diisi" });
  }

  //   buat 1 user baru
  const newUser = {
    id: dataUsers.length + 1,
    name: nama,
    email: eml,
  };

  //   masukkan user baru ke dalam array dataUsers
  dataUsers.push(newUser);

  res.json({
    message: "User berhasil ditambahkan",
    user: newUser,
  });
});

// Mengubah data user berdasarkan id
app.put("/api/users/:id", (req, res) => {
  // dapatkan id dari parameter
  const userId = parseInt(req.params.id);

  // dapatkan data dari body terbaru
  const { nama, eml } = req.body;

  // cari user berdasarakan id nya
  const userIndex = dataUsers.findIndex((user) => user.id === userId);
  console.log("userIndex", userIndex);

  if (userIndex !== -1) {
    // update data user
    dataUsers[userIndex].id = userId;
    dataUsers[userIndex].name = nama;
    dataUsers[userIndex].email = eml;

    console.log("dataUsers", dataUsers);

    res.json({
      message: "User berhasil diupdate",
      user: dataUsers[userIndex],
    });
  } else {
    res.json({ message: "User tidak ditemukan" });
  }
});

// Menghapus data user berdasarkan id
app.delete("/api/users/:id", (req, res) => {
  console.log("Test Delete");
  // dapatkan id dari parameter
  const userId = parseInt(req.params.id);

  // cari user berdasarakan id nya
  const userIndex = dataUsers.findIndex((user) => user.id === userId);
  console.log("userIndex", userIndex);

  if (userIndex !== -1) {
    // hapus data user
    const deletedUser = dataUsers.splice(userIndex, 1);

    console.log("dataUsers", dataUsers);

    res.json({
      message: "User berhasil dihapus",
      user: deletedUser[0],
    });
  } else {
    res.json({ message: "User tidak ditemukan" });
  }
});

// 6. jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
