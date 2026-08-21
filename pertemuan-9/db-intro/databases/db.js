require("dotenv").config();
const mongoose = require("mongoose");

// membuat koneksi ke database
const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb+srv://maujadiprogrammer_db_user:Az44D4hfu6YoFldr@cluster0.toem9fu.mongodb.net/",
    // );
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Berhasil terhubung ke database");
  } catch (error) {
    console.log("Gagal terhubung ke database:".error);
    process.exit(1); // keluar dari aplikasi jika gagal terhubung ke database
  }
};

module.exports = connectDB;
