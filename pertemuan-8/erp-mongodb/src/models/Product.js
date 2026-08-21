const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, "Kode produk wajib diisi"],
    trim: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Nama produk wajib diisi"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Kategori produk wajib diisi"],
  },
  type: {
    type: String,
    enum: ["raw_material", "finished_goods"],
    required: [true, "Jenis produk wajib diisi"],
  },
  sku: {
    type: String,
    trim: true,
  },
  unit: {
    type: String,
    required: [true, "Satuan wajib diisi"],
    default: "pcs",
  },
  price: {
    type: Number,
    required: [true, "Harga wajib diisi"],
    min: [0, "Harga tidak boleh negatif"],
  },
  minStock: {
    type: Number,
    default: 0,
    min: [0, "Stok minimum tidak boleh negatif"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);
