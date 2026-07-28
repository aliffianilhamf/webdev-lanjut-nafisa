# Module 4: Backend Development - Panduan Praktis

## 📚 Daftar Isi
1. [Async/Await](#asyncawait)
2. [Event Emitter](#event-emitter)
3. [Express.js](#expressjs)
4. [Latihan](#latihan)

---

## 🎯 Tujuan Pembelajaran

Setelah menyelesaikan modul ini, peserta mampu:
- Memahami dan menggunakan Async/Await untuk penanganan asynchronous
- Mengimplementasikan Event Emitter untuk pattern pub/sub
- Membuat REST API sederhana menggunakan Express.js

---

## 1️⃣ Async/Await

### Visual: Synchronous vs Asynchronous

| Sync | Task 1 → Task 2 → Task 3 |
|------|---------------------------|
| **Async** | Task 1, Task 2, Task 3 (paralel) |

### Basic Async Function

```javascript
async function getData() {
  return "Hello World";
}
getData().then(console.log);
```

### Await dengan Error Handling

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### Parallel Execution

```javascript
async function fetchParallel() {
  const start = Date.now();
  const [res1, res2, res3] = await Promise.all([
    fetch('url1'),
    fetch('url2'),
    fetch('url3')
  ]);
  console.log(`Parallel: ${Date.now() - start}ms`);
}
```

### Mock Database

```javascript
const mockDB = {
  async getUserById(id) {
    await new Promise(r => setTimeout(r, 500));
    return this.users.find(u => u.id === id);
  },
  users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
};
```

**Best Practice:** Selalu gunakan `try-catch` untuk handle errors. Gunakan `Promise.all()` untuk operasi yang tidak saling bergantung.

---

## 2️⃣ Event Emitter

### Visual
```
Event Emitter ──emit('event')──> Listener (callback)
```

### Dasar

```javascript
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('greeting', (name) => {
  console.log(`Hello, ${name}!`);
});
myEmitter.emit('greeting', 'Alice');
```

### Method Utama

| Method | Fungsi |
|--------|--------|
| `on(event, cb)` | Daftarkan listener |
| `once(event, cb)` | Listener sekali pakai |
| `off(event, cb)` | Batalkan listener |
| `emit(event, ...args)` | Memicu event |

### File Uploader (Contoh Praktis)

```javascript
class FileUploader extends EventEmitter {
  constructor() { super(); }
  upload(file) {
    this.emit('start', file.name);
    let pg = 0;
    const interval = setInterval(() => {
      pg += 20;
      this.emit('progress', pg);
      if (pg >= 100) {
        clearInterval(interval);
        this.emit('complete', file.name);
      }
    }, 500);
  }
}
```

### Chat Server (Contoh Praktis)

```javascript
class ChatServer extends EventEmitter {
  joinUser(username) {
    this.users.push(username);
    this.emit('userJoined', username, this.users.length);
  }
}
```

**Best Practice:** Jangan lupa remove listeners dengan `off()` atau `removeAllListeners()`. Gunakan `once()` untuk event satu kali.

---

## 3️⃣ Express.js

### Visual
```
Browser → Middleware Stack (Log → Parse → Route) → Response
```

### Instalasi

```bash
mkdir express-api && cd express-api
npm init -y && npm install express
```

### Server Dasar

```javascript
const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000);
```

### HTTP Methods

| Method | Contoh | Fungsi |
|--------|--------|--------|
| GET | `/users` | List semua |
| POST | `/users` | Buat baru |
| PUT | `/users/:id` | Update full |
| PATCH | `/users/:id` | Update partial |
| DELETE | `/users/:id` | Hapus |

### Middleware

```javascript
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal Server Error' });
});
```

### CRUD API Lengkap

```javascript
let todos = [{ id: 1, title: 'Learn Express', completed: false }];

app.get('/todos', (req, res) => res.json(todos));

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.max(...todos.map(t => t.id)) + 1,
    title: req.body.title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  todo.title = req.body.title;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(3000);
```

---

## 4️⃣ Latihan

### Latihan 1: Async/Await
Buat function `fetchUserPosts(userId)` yang fetch user data dan posts secara paralel, return combined data, dengan try-catch.

### Latihan 2: Event Emitter
Buat class `Counter` yang emit `countChanged` saat bertambah, `targetReached` saat mencapai target, dan bisa di-reset.

### Latihan 3: Express.js
Buat REST API CRUD untuk products: GET/POST/PUT/DELETE `/api/products`.

---

## 📁 File Referensi

| File | Deskripsi |
|------|-----------|
| `code/async-await.js` | 10 contoh async/await siap run |
| `code/event-emitter.js` | 7 contoh event emitter siap run |
| `code/express/index.js` | REST API Express lengkap |
| `code/express/package.json` | Dependencies Express |

---

**Happy Coding! 🚀**
