const StockTransaction = require("../models/StockTransaction");
const Product = require("../models/Product");

const getStockTransactions = async (req, res) => {
  try {
    const { product, type } = req.query;
    const filter = {};

    if (product) {
      filter.product = product;
    }

    if (type) {
      filter.type = type;
    }

    const transactions = await StockTransaction.find(filter)
      .populate({
        path: "product",
        populate: {
          path: "category",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan semua transaksi stok",
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStockTransactionById = async (req, res) => {
  try {
    const transaction = await StockTransaction.findById(req.params.id)
      .populate({
        path: "product",
        populate: {
          path: "category",
        },
      });

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaksi stok tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan transaksi stok",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createStockTransaction = async (req, res) => {
  try {
    const { product, type, quantity, referenceNo, notes, processedBy } = req.body;

    if (!product || !type || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Produk, tipe transaksi, dan jumlah wajib diisi",
      });
    }

    const existingProduct = await Product.findById(product);
    if (!existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    const newTransaction = await StockTransaction.create({
      product,
      type,
      quantity,
      referenceNo,
      notes,
      processedBy,
    });

    const populatedTransaction = await StockTransaction.findById(newTransaction._id)
      .populate({
        path: "product",
        populate: {
          path: "category",
        },
      });

    res.status(201).json({
      success: true,
      message: "Transaksi stok berhasil dibuat",
      data: populatedTransaction,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStockTransactions,
  getStockTransactionById,
  createStockTransaction,
};
