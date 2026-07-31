# REST API Todo-list

1. Buat data todo-list dengan format array of object, contoh:

```javascript
let todos = [
  { id: 1, title: "Belajar JavaScript", completed: false },
  { id: 2, title: "Membuat REST API", completed: false },
  { id: 3, title: "Membuat Frontend", completed: false },
];
```

2. Buat endpoint GET `/todos` untuk mengambil semua data todo-list.
3. Buat endpoint GET `/todos/:id` untuk mengambil data todo-list berdasarkan id.
4. Buat endpoint POST `/todos` untuk menambahkan data todo-list baru.
5. Buat endpoint PUT `/todos/:id` untuk mengubah data todo-list berdasarkan id.
6. Buat endpoint DELETE `/todos/:id` untuk menghapus data todo-list berdasarkan id.
