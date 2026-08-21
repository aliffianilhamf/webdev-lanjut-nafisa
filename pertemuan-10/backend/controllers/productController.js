const Product = require("../models/Product");
const Category = require("../models/Category");

// menampilkan semua produk
const getAllProducts = async (req, res) => {
  try {
    // mengambil semua produk dan referensi kategori
    const products = await Product.find({}).populate("category", "name type");

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Tidak ada produk yang ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil menampilkan semua produk",
      data: products,
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// membuat produk baru
const createProduct = async (req, res) => {
  try {
    // ambil data dari request body
    const { code, name, description, category, unit, price, stock } = req.body;

    // /validasi input
    if (!code || !name || !category || !unit || !price) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

    // buat produk baru
    const newProduct = new Product({
      code,
      name,
      description,
      category,
      unit,
      price,
      stock,
    });

    await newProduct.save();

    // sebelum dikirim ke response, populate kategori produk
    await newProduct.populate("category");

    res.status(201).json({
      success: true,
      message: "Produk berhasil dibuat",
      data: newProduct,
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// mendapatkan produk berdasarkan id
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate(
      "category",
      "name type",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan data produk",
      data: product,
    });
  } catch (error) {
    console.error(`Error >>>> ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// mengupdate produk berdasarkan id
const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, description, category, unit, price, stock } = req.body;

    // validasi input
    if (!code || !name || !category || !unit || !price) {
      return res.status(400).json({
        success: false,
        message: "Semua field harus diisi",
      });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      { code, name, description, category, unit, price, stock },
      { new: true },
    ).populate("category", "name type");

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
    console.error(`Error >>>> ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
};

// menghapus produk berdasarkan id
const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "Produk berhasil dihapus",
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
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
