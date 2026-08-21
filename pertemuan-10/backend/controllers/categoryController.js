const Category = require("../models/Category");

// menampilkan semua kategori
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tidak ada kategori yang ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil menampilkan semua kategori",
      data: categories,
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// membuat kategori baru
const createCategory = async (req, res) => {
  try {
    const { name, description, type } = req.body;

    // validasi input
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Nama kategori harus diisi",
      });
    }

    const newCategory = new Category({
      name,
      description,
      type,
    });

    const savedCategory = await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Kategori berhasil dibuat",
      data: savedCategory,
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};
// mendapatkan kategori berdasarkan ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil menampilkan kategori",
      data: category,
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};
// memperbarui kategori berdasarkan ID
const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, type, isActive } = req.body;

    // validasi input
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Nama kategori harus diisi",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description, type, isActive },
      { new: true, runValidators: true },
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Kategori berhasil diperbarui",
      data: updatedCategory,
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};
// menghapus kategori berdasarkan ID
const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Kategori berhasil dihapus",
      data: deletedCategory,
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
