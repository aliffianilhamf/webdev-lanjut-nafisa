const express = require("express");
const router = express.Router();
const stockTransactionController = require("../controllers/stockTransactionController");

router.get("/", stockTransactionController.getStockTransactions);
router.get("/:id", stockTransactionController.getStockTransactionById);
router.post("/", stockTransactionController.createStockTransaction);

module.exports = router;
