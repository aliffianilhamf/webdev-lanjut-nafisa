const {
  getAllStockTransactions,
  createStockTransaction,
  getStockTransactionById,
  deleteStockTransactionById,
} = require("../controllers/stockTransactionController");
const express = require("express");
const router = express.Router();

// route untuk menampilkan semua kategori
router.get("/", getAllStockTransactions);
router.post("/", createStockTransaction);
router.get("/:id", getStockTransactionById);
router.delete("/:id", deleteStockTransactionById);

module.exports = router;
