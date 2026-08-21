const mongoose = require("mongoose");

const stockTransactionSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "Produk wajib diisi"],
  },
  type: {
    type: String,
    enum: ["in", "out", "adjustment"],
    required: [true, "Jenis transaksi wajib diisi"],
  },
  quantity: {
    type: Number,
    required: [true, "Jumlah wajib diisi"],
    min: [1, "Jumlah harus lebih dari 0"],
  },
  referenceNo: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  processedBy: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("StockTransaction", stockTransactionSchema);
