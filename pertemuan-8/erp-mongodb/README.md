# Module 8: Backend Express dengan MongoDB untuk ERP

## Deskripsi
Materi ini membahas pembuatan backend ERP menggunakan Express.js dan MongoDB dengan fokus pada:
- Desain database ERP (schema products, categories, stock_transactions)
- CRUD Master Produk (raw material vs finished goods)
- Tracking stok melalui transaksi stok

## Struktur File
```
erp-mongodb/
├── config/
│   └── db.js
├── src/
│   ├── controllers/
│   │   ├── categoryController.js
│   │   ├── productController.js
│   │   └── stockTransactionController.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Product.js
│   │   └── StockTransaction.js
│   ├── routes/
│   │   ├── categoryRoutes.js
│   │   ├── productRoutes.js
│   │   └── stockTransactionRoutes.js
│   └── server.js
├── .env.example
├── .gitignore
└── package.json
```

## Schema Database

### Category
- name: Nama kategori
- description: Deskripsi kategori
- type: Jenis kategori (raw_material, finished_goods, other)
- isActive: Status kategori

### Product
- code: Kode unik produk
- name: Nama produk
- description: Deskripsi produk
- category: Referensi ke Category
- type: Jenis produk (raw_material, finished_goods)
- sku: Stock Keeping Unit
- unit: Satuan (pcs, kg, box, dll)
- price: Harga produk
- minStock: Stok minimum
- isActive: Status produk

### StockTransaction
- product: Referensi ke Product
- type: Jenis transaksi (in, out, adjustment)
- quantity: Jumlah transaksi
- referenceNo: Nomor referensi (opsional)
- notes: Catatan (opsional)
- processedBy: Yang memproses (opsional)

## Setup

```bash
npm install
```

Copy `.env.example` ke `.env` dan sesuaikan konfigurasi:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/erp_db
NODE_ENV=development
```

Jalankan server:

```bash
npm run dev
```

## API Endpoints

### Categories
- `GET /api/categories` - Get semua kategori
- `GET /api/categories/:id` - Get kategori by ID
- `POST /api/categories` - Create kategori baru
- `PUT /api/categories/:id` - Update kategori
- `DELETE /api/categories/:id` - Delete kategori

### Products
- `GET /api/products` - Get semua produk (filter: type, category, isActive)
- `GET /api/products/:id` - Get produk by ID
- `POST /api/products` - Create produk baru
- `PUT /api/products/:id` - Update produk
- `DELETE /api/products/:id` - Delete produk

### Stock Transactions
- `GET /api/stock-transactions` - Get semua transaksi stok (filter: product, type)
- `GET /api/stock-transactions/:id` - Get transaksi by ID
- `POST /api/stock-transactions` - Create transaksi stok baru

## Contoh Request Body

### Create Category
```json
{
  "name": "Bahan Baku Elektronik",
  "description": "Kategori untuk bahan baku elektronik",
  "type": "raw_material"
}
```

### Create Product (Raw Material)
```json
{
  "code": "RM-001",
  "name": "Kabel USB-C",
  "description": "Kabel USB-C 1 meter",
  "category": "60d5f3a9b8c7d6e5f4a3b2c1",
  "type": "raw_material",
  "sku": "USB-C-1M",
  "unit": "pcs",
  "price": 25000,
  "minStock": 50
}
```

### Create Product (Finished Goods)
```json
{
  "code": "FG-001",
  "name": "Laptop ASUS Zenbook",
  "description": "Laptop ASUS Zenbook 14 inch",
  "category": "60d5f3a9b8c7d6e5f4a3b2c1",
  "type": "finished_goods",
  "sku": "ASUS-ZEN-14",
  "unit": "pcs",
  "price": 12000000,
  "minStock": 5
}
```

### Create Stock Transaction (Stock In)
```json
{
  "product": "60d5f3a9b8c7d6e5f4a3b2c1",
  "type": "in",
  "quantity": 100,
  "referenceNo": "PO-2024-001",
  "notes": "Pembelian bahan baku bulanan",
  "processedBy": "admin"
}
```

### Create Stock Transaction (Stock Out)
```json
{
  "product": "60d5f3a9b8c7d6e5f4a3b2c1",
  "type": "out",
  "quantity": 10,
  "referenceNo": "SO-2024-001",
  "notes": "Pengiriman pesanan customer",
  "processedBy": "admin"
}
```
