const mongoose = require("mongoose");

// membuat skema transaksi stok
const stockTransactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Produk harus diisi"],
  },
  type: {
    type: String,
    enum: ["in", "out"],
    required: [true, "Tipe transaksi harus diisi"],
  },
  quantity: {
    type: Number,
    required: [true, "Kuantitas harus diisi"],
    min: [1, "Kuantitas tidak boleh kurang dari 1"],
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, "Catatan tidak boleh lebih dari 500 karakter"],
  },
  proceedBy: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("StockTransaction", stockTransactionSchema);
