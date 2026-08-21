const mongoose = require("mongoose");

// skema kategori
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama kategori harus diisi"],
      trim: true,
      unique: true,
      maxlength: [100, "Nama kategori tidak boleh lebih dari 100 karakter"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "Deskripsi kategori tidak boleh lebih dari 500 karakter",
      ],
    },
    type: {
      type: String,
      enum: ["raw_material", "finished_product", "other"],
      default: "other",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Category", categorySchema);
