const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// GET all items
router.get("/items", itemController.getAllItems);

module.exports = router;
