const StockTransaction = require("../models/StockTransaction");
const Product = require("../models/Product");

// controller untuk menampilkan semua transaksi stok
const getAllStockTransactions = async (req, res) => {
  try {
    const transactions = await StockTransaction.find().populate({
      path: "product",
      select: "code name",
      populate: {
        path: "category",
        select: "name type",
      },
    });

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tidak ada transaksi stok yang ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data transaksi",
      data: transactions,
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res
      .status(500)
      .json({ sucess: false, message: "Gagal memuat log transaksi" });
  }
};

// controller untuk membuat transaksi stok baru
const createStockTransaction = async (req, res) => {
  try {
    const { product: productId, type, quantity, notes, proceedBy } = req.body;
    // cek ketersedian produk
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    // amnbil stock saat ini
    const currentStock = product.stock;
    let newStock = currentStock;

    // update stock berdasarkan tipe transaksi
    if (type === "in") {
      newStock = newStock + Number(quantity);
    } else if (type === "out") {
      if (currentStock < quantity) {
        return res.status(400).json({
          success: false,
          message: "Stock tidak mencukupi untuk transaksi keluar",
        });
      }
      newStock = currentStock - Number(quantity);
    }

    // update stock produk
    const transaction = new StockTransaction({
      product: productId,
      type,
      quantity,
      notes,
      proceedBy,
    });

    await transaction.save();

    // update stock produk
    product.stock = newStock;
    await product.save();

    // populate data produk pada transaksi untuk response
    await transaction.populate({
      path: "product",
      select: "code name",
      populate: {
        path: "category",
        select: "name type",
      },
    });

    res.status(201).json({
      success: true,
      message: "Transaksi berhasil dicatat",
      data: transaction,
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res
      .status(500)
      .json({ sucess: false, message: "Gagal mencatat transaksi baru" });
  }
};

// mendapatkan transaksi stok berdasaarkan id
const getStockTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await StockTransaction.findById(id).populate({
      path: "product",
      select: "code name",
      populate: {
        path: "category",
        select: "name type",
      },
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaksi tidak ditemukan" });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data transaksi",
      data: transaction,
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res
      .status(500)
      .json({ sucess: false, message: "Gagal memuat log transaksi" });
  }
};

// delete transaksi stok berdasarkan id
const deleteStockTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await StockTransaction.findById(id);
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaksi tidak ditemukan" });
    }

    // kembalikan stock produk
    const product = await Product.findById(transaction.product);
    if (product) {
      if (transaction.type === "in") {
        product.stock = product.stock - transaction.quantity;
      } else if (transaction.type === "out") {
        product.stock = product.stock + transaction.quantity;
      }

      await product.save();
    }

    // hapus
    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Transaksi berhasil dihapus",
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res
      .status(500)
      .json({ sucess: false, message: "Gagal menghapus log transaksi" });
  }
};
module.exports = {
  getAllStockTransactions,
  createStockTransaction,
  getStockTransactionById,
  deleteStockTransactionById,
};
