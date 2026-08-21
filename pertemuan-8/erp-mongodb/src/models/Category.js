const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama kategori wajib diisi"],
    trim: true,
    unique: true,
    maxlength: [100, "Nama kategori maksimal 100 karakter"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "Deskripsi maksimal 500 karakter"],
  },
  type: {
    type: String,
    enum: ["raw_material", "finished_goods", "other"],
    default: "other",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Category", categorySchema);
