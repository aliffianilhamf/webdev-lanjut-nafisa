const mongoose = require("mongoose");

// membuat skema produk
const productSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: [true, "Kode produk harus diisi"],
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Nama produk harus diisi"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Kategori produk harus diisi"],
    },
    unit: {
      type: String,
      required: [true, "Satuan produk harus diisi"],
      default: "pcs",
    },
    price: {
      type: Number,
      required: [true, "Harga produk harus diisi"],
      min: [0, "harga produk tidak boleh kurang dari 0"],
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stock minimum tidak boleh negatif"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Product", productSchema);
