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

function getItemById(req, res) {
  try {
    // ambil id dari parameter
    const id = parseInt(req.params.id);

    // cari item berdasarkan id
    const item = itemModel.findById(id);

    // cek apakah item ditemukan
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item tidak ditemukan",
      });
    }

    // item ada, kirim response ke client
    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan item",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Membuat item baru
function createItem(req, res) {
  try {
    // ambil data item dari body request
    const { name, price, stock } = req.body;

    // cek apakah data item itu valid
    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Nama dan harga item harus diisi",
      });
    }

    // buat item baru
    const newItem = itemModel.add({ name, price, stock });

    // cek apakah item berhasil dibuat
    if (!newItem) {
      return res.status(500).json({
        success: false,
        message: "Gagal membuat item baru",
      });
    }

    // item berhasil dibuat, kirim response ke client
    res.status(201).json({
      success: true,
      message: "Berhasil membuat item baru",
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// update item by id
function updateItem(req, res) {
  try {
    // ambil id dari parameter
    const itemId = parseInt(req.params.id);

    // ambil data item baru dari body request
    const { name, price, stock } = req.body;

    // cek apakah data item baru valid
    if (!name || !price || !stock) {
      return res.status(400).json({
        success: false,
        message: "Nama, harga, dan stock item harus diisi",
      });
    }

    // update item nya
    const updatedItem = itemModel.update(itemId, { name, price, stock });

    // cek apakah item berhasil di update
    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item tidak ditemukan",
      });
    }

    // item berhasil di update, kirim response ke client
    res.status(200).json({
      success: true,
      message: "Berhasil mengupdate item",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// hapus item by id
function deleteItem(req, res) {
  try {
    // ambil id dari parameter
    const itemId = parseInt(req.params.id);

    // hapus item nya
    const deletedItem = itemModel.del(itemId);

    // cel apakah item berhasil di hapus
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item tidak ditemukan",
      });
    }

    // item berhasil di hapus, kirim responsenya ke client
    res.status(200).json({
      success: true,
      message: "Berhasil menghapus item",
      data: deletedItem,
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
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
