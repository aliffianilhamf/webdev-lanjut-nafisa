const Book = require("../models/book");

// mendapatkan semua buku
const getAllBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({});

    if (!allBooks) {
      return res.status(404).json({
        success: false,
        message: "Buku tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      message: "berhasil mendapatkan semua buku",
      data: allBooks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengambil data buku",
    });
  }
};

// Membuat buku baru
const createBook = async (req, res) => {
  try {
    // 1. ambil data dari request body
    const { judul, penulis, tahunTerbit } = req.body;

    // 2. cek apakah data keisi semua atau tidak
    if (!judul || !penulis || !tahunTerbit) {
      return res.status(400).json({
        success: false,
        message: "Judul, penulis, dan tahun terbit harus diisi",
      });
    }

    // 3. buat buku baru
    const newBook = new Book({
      judul,
      penulis,
      tahunTerbit,
    });
    // const newBook = new Book({
    //   judul: "Peetualangan si bolang",
    //   penulis: "Rendra sm",
    //  tahunTerbit: 2019,
    // })

    // 4. simpan buku baru ke database

    const savedBook = await newBook.save();

    // 5. cek apakah buku berhasil disimpan
    if (!savedBook) {
      return res.status(400).json({
        success: false,
        message: "Gagal menyimpan buku baru",
      });
    }

    // 6. kirim response berhasil menyimpan buku baru
    res.status(201).json({
      status: true,
      message: "Berhasil menyimpan buku baru",
      data: savedBook,
    });
  } catch (error) {
    console.error(`Error saat membuat buku: ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat membuat buku",
    });
  }
};

// Mendapatkan single book berdasarkan ID
const getBookById = async (req, res) => {
  try {
    // 1. dapatkan ID dari parameter URL
    const { id } = req.params;

    //2. cari buku berdasarkan ID
    const book = await Book.findById(id);

    // 3. cek apakah buku ditemukan atau tidak
    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Gagal memuat buku",
      });
    }

    // 4. kirim response berhasil memuat buku
    res.status(200).json({
      success: true,
      message: "Berhasil memuat buku",
      data: book,
    });
  } catch (error) {
    console.error(`Error saat memuat buku: ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat memuat buku",
    });
  }
};

// update buku berdasarkan ID
const updateBookById = async (req, res) => {
  try {
    // 1. dapatkan ID dari parameter URL
    const { id } = req.params;

    // 2. dapatkan data dari request body
    const { judul, penulis, tahunTerbit } = req.body;

    // 3. update buku berdasarkan ID
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { judul, penulis, tahunTerbit },
      { new: true },
    );

    // 4. cek apakah buku berhasil diupdate
    if (!updatedBook) {
      return res.status(400).json({
        success: false,
        message: "Gagal mengupdate buku",
      });
    }

    // 5. kirim response berhasil mengupdate buku
    res.status(200).json({
      success: true,
      message: "Berhasil mengupdate buku",
      data: updatedBook,
    });
  } catch (error) {
    console.error(`Error saat mengupdate buku: ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat mengupdate buku",
    });
  }
};

// delete buku berdasarkan ID
const deleteBookById = async (req, res) => {
  try {
    // 1. dapatkan ID dari parameter URL
    const { id } = req.params;

    //  2. hapus buku berdasarkan ID
    const deletedBook = await Book.findByIdAndDelete(id);

    // 3. cek apakah buku berhasil dihapus
    if (!deletedBook) {
      return res.status(400).json({
        success: false,
        message: "Gagal menghapus buku",
      });
    }

    // 4. kirim response berhasil menghapus buku
    res.status(200).json({
      success: true,
      message: "Berhasil menghapus buku",
      data: deletedBook,
    });
  } catch (error) {
    console.error(`Error saat menghapus buku: ${error}`);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat menghapus buku",
    });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  getBookById,
  updateBookById,
  deleteBookById,
};
