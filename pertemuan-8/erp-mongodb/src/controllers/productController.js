const Product = require("../models/Product");
const Category = require("../models/Category");

const getProducts = async (req, res) => {
  try {
    const { type, category, isActive } = req.query;
    const filter = {};

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    const products = await Product.find(filter).populate("category");

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan semua produk",
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }
    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan produk",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { code, name, description, category, type, sku, unit, price, minStock, isActive } = req.body;

    if (!code || !name || !category || !type || !price) {
      return res.status(400).json({
        success: false,
        message: "Kode, nama, kategori, tipe, dan harga wajib diisi",
      });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Kategori tidak ditemukan",
      });
    }

    const newProduct = await Product.create({
      code,
      name,
      description,
      category,
      type,
      sku,
      unit,
      price,
      minStock,
      isActive,
    });

    res.status(201).json({
      success: true,
      message: "Produk berhasil dibuat",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { code, name, description, category, type, sku, unit, price, minStock, isActive } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { code, name, description, category, type, sku, unit, price, minStock, isActive },
      { new: true, runValidators: true }
    ).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Produk berhasil diperbarui",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
