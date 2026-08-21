require("dotenv").config();
const mongoose = require("mongoose");

// membuat koneksi ke database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Berhasil terhubung ke database");
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    process.exit(1); // keluar dari aplikasi jika gagal terhubung ke database
  }
};

module.exports = connectDB;
