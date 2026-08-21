const mongoose = require("mongoose");
const Category = require("./models/Category");
const Product = require("./models/Product");
const StockTransaction = require("./models/StockTransaction");

require("dotenv").config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/erp_db";
    await mongoose.connect(uri, { dbName: "erp_db" });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

const seedCategories = async () => {
  const categories = [
    { name: "Bahan Baku Elektronik", description: "Kategori untuk bahan baku elektronik", type: "raw_material" },
    { name: "Barang Jadi Elektronik", description: "Kategori untuk barang jadi elektronik", type: "finished_goods" },
    { name: "Aksesoris", description: "Kategori untuk aksesoris tambahan", type: "other" },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const existing = await Category.findOne({ name: category.name });
    if (!existing) {
      const newCategory = await Category.create(category);
      createdCategories.push(newCategory);
      console.log(`Category created: ${newCategory.name}`);
    } else {
      createdCategories.push(existing);
      console.log(`Category exists: ${existing.name}`);
    }
  }

  return createdCategories;
};

const seedProducts = async (categories) => {
  const products = [
    {
      code: "RM-001",
      name: "Kabel USB-C",
      description: "Kabel USB-C 1 meter, original",
      category: categories.find((c) => c.name === "Bahan Baku Elektronik")._id,
      type: "raw_material",
      sku: "USB-C-1M",
      unit: "pcs",
      price: 25000,
      minStock: 50,
    },
    {
      code: "RM-002",
      name: "Charger Original",
      description: "Charger 20W original",
      category: categories.find((c) => c.name === "Bahan Baku Elektronik")._id,
      type: "raw_material",
      sku: "CHR-20W",
      unit: "pcs",
      price: 75000,
      minStock: 30,
    },
    {
      code: "FG-001",
      name: "Laptop ASUS Zenbook 14",
      description: "Laptop ASUS Zenbook 14 inch, Intel Core i5",
      category: categories.find((c) => c.name === "Barang Jadi Elektronik")._id,
      type: "finished_goods",
      sku: "ASUS-ZEN-14",
      unit: "pcs",
      price: 12000000,
      minStock: 5,
    },
    {
      code: "FG-002",
      name: "Smartphone Samsung Galaxy A54",
      description: "Smartphone Samsung Galaxy A54 5G",
      category: categories.find((c) => c.name === "Barang Jadi Elektronik")._id,
      type: "finished_goods",
      sku: "SAM-A54",
      unit: "pcs",
      price: 5500000,
      minStock: 10,
    },
  ];

  for (const product of products) {
    const existing = await Product.findOne({ code: product.code });
    if (!existing) {
      await Product.create(product);
      console.log(`Product created: ${product.name}`);
    } else {
      console.log(`Product exists: ${existing.name}`);
    }
  }
};

const seedStockTransactions = async () => {
  const transactions = [
    { product: "RM-001", type: "in", quantity: 100, referenceNo: "PO-2024-001", notes: "Pembelian bahan baku bulanan", processedBy: "admin" },
    { product: "RM-002", type: "in", quantity: 50, referenceNo: "PO-2024-002", notes: "Pembelian bahan baku bulanan", processedBy: "admin" },
    { product: "RM-001", type: "out", quantity: 10, referenceNo: "SO-2024-001", notes: "Pengiriman pesanan customer", processedBy: "admin" },
    { product: "FG-001", type: "in", quantity: 20, referenceNo: "PO-2024-003", notes: "Pembelian barang jadi", processedBy: "admin" },
    { product: "FG-002", type: "out", quantity: 5, referenceNo: "SO-2024-002", notes: "Pengiriman pesanan customer", processedBy: "admin" },
  ];

  for (const transaction of transactions) {
    const existing = await StockTransaction.findOne({
      product: transaction.product,
      type: transaction.type,
      quantity: transaction.quantity,
      referenceNo: transaction.referenceNo,
    });
    if (!existing) {
      await StockTransaction.create(transaction);
      console.log(`Stock transaction created: ${transaction.type} for ${transaction.product}`);
    } else {
      console.log(`Stock transaction exists: ${transaction.type} for ${existing.product}`);
    }
  }
};

const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");
    await connectDB();

    console.log("\nSeeding categories...");
    const categories = await seedCategories();

    console.log("\nSeeding products...");
    await seedProducts(categories);

    console.log("\nSeeding stock transactions...");
    await seedStockTransactions();

    console.log("\nDatabase seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
