const { count } = require("node:console");
const itemModel = require("../models/itemModel");

function getAllItems(req, res) {
  try {
    const items = itemModel.find();

    // kirim response ke client
    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan semua item",
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getAllItems,
};
