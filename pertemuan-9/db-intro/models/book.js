const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    judul: {
      type: String,
      unique: true,
      required: [true, "Judul buku harus diisi"],
      trim: true,
    },
    penulis: {
      type: String,
      required: [true, "Nama penulis harus diisi"],
      trim: true,
    },
    tahunTerbit: {
      type: Number,
      required: [true, "Tahun terbit harus diisi"],
      min: [1000, "Tahun terbit harus lebih dari 1000"],
      max: [
        new Date().getFullYear(),
        "Tahun terbit tidak boleh lebih dari tahun sekarang",
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Book", bookSchema);
