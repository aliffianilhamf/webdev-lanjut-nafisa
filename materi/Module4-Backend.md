# Module 4: Backend Development

## Daftar Isi
1. [Async/Await](#1-asyncawait)
2. [Event Emitter](#2-event-emitter)
3. [Intro Express.js](#3-intro-expressjs)

---

## 1. Async/Await

### 1.1 Apa itu Async/Await?

Async/Await adalah sintaks modern untuk menangani operasi asynchronous di JavaScript. Ini dibangun di atas Promise dan membuat kode lebih mudah dibaca.

```
┌─────────────────────────────────────────────────────────────┐
│  synchronous (sequensial)                                   │
│  ┌──────┐     ┌──────┐     ┌──────┐                         │
│  │Task 1│────>│Task 2│────>│Task 3│                         │
│  └──────┘     └──────┘     └──────┘                         │
│       ↓            ↓            ↓                            │
│     SELESAI    SELESAI      SELESAI                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  asynchronous (concurrent)                                  │
│  ┌──────┐   ┌──────┐   ┌──────┐                             │
│  │Task 1│   │Task 2│   │Task 3│                             │
│  └──────┘   └──────┘   └──────┘                             │
│       ↓          ↓          ↓                                │
│    SELESAI   SELESAI    SELESAI                             │
│       └────────┴───────────┘                                 │
│              SEMUA SELESAI                                   │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Async Function

Function dengan kata kunci `async` selalu mengembalikan Promise.

```javascript
async function getData() {
  return "Hello World";
}

getData().then(console.log);
// Output: "Hello World"
```

### 1.3 Await Keyword

`await` hanya bisa digunakan di dalam `async function`. Ini menunggu Promise selesai.

```javascript
// Tanpa async/await (menggunakan .then())
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Dengan async/await (lebih bersih)
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

**Visual Flow:**
```
┌──────────────────────────────────────────────────────┐
│  async function fetchData() {                        │
│    try {                                             │
│      ┌────────────────────┐                          │
│      │ const res = await  │─┐                        │
│      │ fetch(...)         │ │ PENDING                │
│      └────────────────────┘ │                        │
│           │                 │                        │
│           │ SELESAI         │                        │
│           ↓                 │                        │
│      ┌────────────────────┐ │                        │
│      │ const data = await │─┼─> PENDING              │
│      │ res.json()         │ │                        │
│      └────────────────────┘ │                        │
│           │                 │                        │
│           │ SELESAI         │                        │
│           ↓                 │                        │
│      console.log(data)      │                        │
│    } catch(error) {         │                        │
│      console.error(error)   │                        │
│    }                        │                        │
│  }                          │                        │
└─────────────────────────────┴────────────────────────┘
```

### 1.4 Error Handling

```javascript
async function safeFetch() {
  try {
    const response = await fetch('https://invalid-url.com');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}
```

**Error Flow:**
```
┌─────────────────────────────────────────────┐
│  try block                                  │
│  ┌───────────────────────┐                  │
│  │ await fetch(...)      │─> SUCCESS ──>    │
│  │ await response.json() │                  │
│  └───────────────────────┘                  │
│         │                                   │
│         └─> RETURN DATA                     │
│                                             │
│  catch block (jika error)                   │
│  ┌───────────────────────┐                  │
│  │ await fetch(...)      │─> ERROR ──>      │
│  │ await response.json() │    CATCH         │
│  └───────────────────────┘                  │
│         │                                   │
│         └─> RETURN NULL                     │
└─────────────────────────────────────────────┘
```

### 1.5 Contoh Praktis: Serial vs Parallel Execution

```javascript
// Serial: Menunggu satu per satu
async function fetchSerial() {
  const start = Date.now();
  const res1 = await fetch('url1');
  const res2 = await fetch('url2');
  const res3 = await fetch('url3');
  console.log(`Serial: ${Date.now() - start}ms`);
}

// Parallel: Menjalankan bersamaan
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

**Visual Comparison:**
```
SERIAL EXECUTION                     PARALLEL EXECUTION
────────────────────────             ───────────────────────
Task 1 ──────────>                   ┌─> Task 1 ────────┐
Task 2 ──────────>          TIME     │  Task 2 ──────── │─> TIME
Task 3 ──────────>                   │  Task 3 ──────── │  SHORTER
                                     └──────────────────┘
```

### 1.6 Practical Examples

**Contoh 1: Database Operations**
```javascript
async function getUserById(id) {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return user;
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
}
```

**Contoh 2: Multiple API Calls**
```javascript
async function getUserData(userId) {
  try {
    const [user, posts, comments] = await Promise.all([
      fetch(`/api/users/${userId}`).then(r => r.json()),
      fetch(`/api/users/${userId}/posts`).then(r => r.json()),
      fetch(`/api/users/${userId}/comments`).then(r => r.json())
    ]);
    
    return { user, posts, comments };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}
```

---

## 2. Event Emitter

### 2.1 Apa itu Event Emitter?

Event Emitter adalah pola desain yang memungkinkan objek untuk "mempublikasikan" kejadian (events) dan objek lain untuk "mendengarkan" kejadian tersebut.

```
┌──────────────────────┐           ┌──────────────────────┐
│   Event Emitter      │           │   Event Listener     │
│   (Publisher)        │──────────>│   (Subscriber)       │
│                      │           │                      │
│  • emit('event')     │  Signals  │  • on('event', cb)   │
│  • on('event', cb)   │  ────────>│  • once('event', cb) │
│  • off('event', cb)  │           │  • emit('event')     │
│                      │           │                      │
└──────────────────────┘           └──────────────────────┘
```

### 2.2 Dasar-Dasar Event Emitter

```javascript
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Mendaftarkan listener
myEmitter.on('greeting', (name) => {
  console.log(`Hello, ${name}!`);
});

// Memicu event
myEmitter.emit('greeting', 'Alice');
// Output: Hello, Alice!
```

**Flow Diagram:**
```
┌──────────────────────────────────────────────────────┐
│  myEmitter.on('greeting', callback)                  │
│  ┌──────────────────────────────────────────────┐    │
│  │ Listener registered in internal list         │    │
│  └──────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
                    │
                    │ emit('greeting', 'Alice')
                    ▼
┌──────────────────────────────────────────────────────┐
│  myEmitter.emit('greeting', 'Alice')                 │
│  ┌──────────────────────────────────────────────┐    │
│  │ Find all listeners for 'greeting'            │    │
│  │ Call each listener with arguments            │    │
│  └──────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────┐
│  Callback executed:                                  │
│  console.log(`Hello, Alice!`)                        │
└──────────────────────────────────────────────────────┘
```

### 2.3 Method Utama Event Emitter

```javascript
// Mendaftarkan listener (bisa dipanggil berkali-kali)
emitter.on('event', callback);

// Mendaftarkan listener hanya sekali
emitter.once('event', callback);

// Membatalkan listener
emitter.off('event', callback);
// atau
emitter.removeListener('event', callback);

// Memicu event
emitter.emit('event', arg1, arg2, ...);

// Mendapatkan jumlah listener
emitter.listenerCount('event');

// Mendapatkan semua listener
emitter.listeners('event');
```

### 2.4 Contoh Praktis: File Upload Progress

```javascript
const EventEmitter = require('events');

class FileUploader extends EventEmitter {
  constructor() {
    super();
    this.progress = 0;
  }

  upload(file) {
    this.emit('start', file.name);

    for (let i = 1; i <= 10; i++) {
      setTimeout(() => {
        this.progress = i * 10;
        this.emit('progress', this.progress);
      }, i * 100);
    }

    setTimeout(() => {
      this.emit('complete', file.name);
    }, 1000);
  }
}

const uploader = new FileUploader();

uploader.on('start', (fileName) => {
  console.log(`Starting upload: ${fileName}`);
});

uploader.on('progress', (percent) => {
  console.log(`Upload progress: ${percent}%`);
});

uploader.on('complete', (fileName) => {
  console.log(`Upload complete: ${fileName}`);
});

uploader.emit('progress', 25);
uploader.emit('progress', 50);
uploader.emit('progress', 75);
uploader.emit('progress', 100);

uploader.upload({ name: 'document.pdf' });
```

**Visual Flow:**
```
┌──────────────────────────────────────────────────────────┐
│  uploader.upload({ name: 'document.pdf' })               │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│  emit('start', 'document.pdf')                           │
│  ┌──────────────────────────────────────────────────┐    │
│  │ Listener 1: console.log('Starting upload...')    │    │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│  Loop: emit('progress', 10), emit('progress', 20)...    │
│  ┌────────────────────��─────────────────────────────┐    │
│  │ Listener 2: console.log('Upload progress: X%')   │    │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│  emit('complete', 'document.pdf')                        │
│  ┌──────────────────────────────────────────────────┐    │
│  �� Listener 3: console.log('Upload complete...')    │    │
│  └──────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

### 2.5 Contoh Praktis: Server Events

```javascript
const EventEmitter = require('events');

class Server extends EventEmitter {
  constructor(port) {
    super();
    this.port = port;
    this.clients = [];
  }

  connect(clientId) {
    this.clients.push(clientId);
    this.emit('clientConnected', clientId, this.clients.length);
  }

  disconnect(clientId) {
    this.clients = this.clients.filter(id => id !== clientId);
    this.emit('clientDisconnected', clientId, this.clients.length);
  }

  broadcast(message) {
    this.emit('message', message);
  }
}

const server = new Server(3000);

server.on('clientConnected', (clientId, count) => {
  console.log(`Client ${clientId} connected. Total: ${count}`);
});

server.on('clientDisconnected', (clientId, count) => {
  console.log(`Client ${clientId} disconnected. Total: ${count}`);
});

server.on('message', (message) => {
  console.log(`Broadcast: ${message}`);
});

server.connect('client-1');
server.connect('client-2');
server.broadcast('Hello everyone!');
server.disconnect('client-1');
```

### 2.6 Best Practices

```javascript
// ✅ Good: Handle errors
emitter.on('error', (err) => {
  console.error('Error occurred:', err);
});

// ✅ Good: Clean up listeners
const listener = () => console.log('Event fired');
emitter.on('event', listener);
// ... later
emitter.off('event', listener);

// ❌ Bad: Multiple error listeners without handling
emitter.on('error', (err) => console.log(err));
emitter.on('error', (err) => console.log(err)); // Double handling!

// ❌ Bad: Memory leaks
for (let i = 0; i < 1000; i++) {
  emitter.on('event', () => console.log(i)); // Creates 1000 listeners!
}
```

---

## 3. Intro Express.js

### 3.1 Apa itu Express.js?

Express.js adalah framework web minimal dan fleksibel untuk Node.js. Ini menyediakan fitur untuk:
- Routing (mendefinisikan endpoint)
- Middleware (function antara request dan response)
- Template rendering
- Error handling

```
┌─────────────────────────────────────────────────────────────┐
│  Client (Browser)                                           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ HTTP Request (GET, POST, PUT, DELETE)                  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Express.js Server                                          │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Middleware Stack                                        │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐               │ │
│  │  │  Log     │ │  Parse   │ │  Route   │               │ │
│  │  │  Request │ │  Body    │ │  Handler │               │ │
│  │  └──────────┘ └──────────┘ └──────────┘               │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Response (HTML, JSON, File, etc.)                          │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Instalasi dan Setup

```bash
# Buat project baru
mkdir my-express-app
cd my-express-app

# Inisialisasi npm
npm init -y

# Install Express
npm install express

# Install nodemon (optional, untuk auto-restart)
npm install --save-dev nodemon
```

**File `package.json`:**
```json
{
  "name": "my-express-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

### 3.3 Server Dasar

```javascript
// index.js
const express = require('express');
const app = express();

// Port
const PORT = process.env.PORT || 3000;

// Route utama
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Visual Request Flow:**
```
┌─────────────────────────────────────────────────────────────┐
│  Browser: http://localhost:3000/                            │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Express Server                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ app.get('/', handler)                                   │ │
│  │ ┌────────────────────────────────────────────────────┐ │ │
│  │ │ 1. Request masuk                                   │ │ │
│  │ │ 2. Matching route                                  │ │ │
│  │ │ 3. Execute handler                                 │ │ │
│  │ │ 4. Send response                                   │ │ │
│  │ └────────────────────────────────────────────────────┘ │ │
│  └──────────────────���─────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Response: "Hello World!"                                   │
└─────────────────────────────────────────────────────────────┘
```

### 3.4 HTTP Methods

```javascript
// GET - ambil data
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

// POST - buat data baru
app.post('/users', (req, res) => {
  res.json({ message: 'Create new user' });
});

// PUT - update data
app.put('/users/:id', (req, res) => {
  res.json({ message: `Update user ${req.params.id}` });
});

// DELETE - hapus data
app.delete('/users/:id', (req, res) => {
  res.json({ message: `Delete user ${req.params.id}` });
});

// PATCH - update sebagian data
app.patch('/users/:id', (req, res) => {
  res.json({ message: `Patch user ${req.params.id}` });
});
```

**Visual HTTP Methods:**
```
┌─────────────────────────────────────────────────────────────┐
│  RESTful API Endpoints                                      │
│                                                             │
│  ┌──────────┬────────────┬──────────────────────────────┐  │
│  │  Method  │   Route    │         Purpose              │  │
│  ├──────────┼────────────┼──────────────────────────────┤  │
│  │   GET    │ /users     │ List semua users             │  │
│  │   GET    │ /users/1   │ Detail user ID 1             │  │
│  │   POST   │ /users     │ Buat user baru               │  │
│  │   PUT    │ /users/1   │ Update user ID 1 (full)      │  │
│  │   PATCH  │ /users/1   │ Update user ID 1 (partial)   │  │
│  │  DELETE  │ /users/1   │ Hapus user ID 1              │  │
│  └──────────┴────────────┴──────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 3.5 Routing

```javascript
// index.js
const express = require('express');
const app = express();

// Route dengan parameter
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId });
});

// Route dengan query parameter
app.get('/search', (req, res) => {
  const query = req.query.q;
  const page = req.query.page || 1;
  res.json({ query, page });
});

// Route dengan status code
app.get('/error', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Route dengan header
app.get('/headers', (req, res) => {
  res.setHeader('X-Custom-Header', 'Hello');
  res.json({ headers: req.headers });
});

app.listen(3000);
```

**Visual Parameter Types:**
```
┌─────────────────────────────────────────────────────────────┐
│  URL Types                                                  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  /users/123                                          │  │
│  │           └───> req.params.id = "123"               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  /search?q=hello&page=2                              │  │
│  │           └───> req.query.q = "hello"               │  │
│  │           └───> req.query.page = "2"                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  POST /users (body: {"name": "John"})               │  │
│  │           └───> req.body.name = "John"              │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 3.6 Middleware

Middleware adalah function yang menangani request dan response. Diexpress, middleware dijalankan berurutan.

```javascript
// Middleware 1: Log request
function logRequest(req, res, next) {
  console.log(`${new Date()} - ${req.method} ${req.url}`);
  next(); // Lanjut ke middleware berikutnya
}

// Middleware 2: Parse JSON body
app.use(express.json());

// Middleware 3: Custom
function customMiddleware(req, res, next) {
  req.timestamp = Date.now();
  next();
}

// Apply middleware
app.use(logRequest);
app.use(customMiddleware);

// Route
app.get('/data', (req, res) => {
  res.json({ timestamp: req.timestamp });
});
```

**Visual Middleware Flow:**
```
┌─────────────────────────────────────────────────────────────┐
│  Request                                                    │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Middleware Stack                                           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │ │
│  │ │  Middleware 1│─>│  Middleware 2│─>│  Middleware 3│  │ │
│  │ │   (log)      │  │  (parse)     │  │  (auth)      │  │ │
│  │ └──────────────┘  └──────────────┘  └──────────────┘  │ │
│  │        │                 │                 │           │ │
│  │        ▼                 ▼                 ▼           │ │
│  │  ┌──────────────────────────────────────────────┐     │ │
│  │  │  Route Handler                               │     │ │
│  │  │  res.json({ data: "Hello" })                 │     │ │
│  │  └──────────────────────────────────────────────┘     │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  Response                                                   │
└─────────────────────────────────────────────────────────────┘
```

### 3.7 Middleware Types

```javascript
// 1. Application-level middleware
app.use((req, res, next) => {
  console.log('Application middleware');
  next();
});

// 2. Router-level middleware
const router = express.Router();
router.use((req, res, next) => {
  console.log('Router middleware');
  next();
});

// 3. Error-handling middleware (harus punya 4 parameter)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 4. Built-in middleware
app.use(express.json());      // Parse JSON body
app.use(express.urlencoded()); // Parse URL-encoded body
app.use(express.static('public')); // Serve static files

// 5. Third-party middleware
const morgan = require('morgan');
app.use(morgan('dev')); // HTTP request logger
```

### 3.8 Serve Static Files

```javascript
// Serve static files dari folder 'public'
app.use(express.static('public'));

// Struktur folder:
// project/
//   public/
//     style.css
//     script.js
//     images/
//       logo.png
//   index.js

// Access: http://localhost:3000/style.css
// Access: http://localhost:3000/images/logo.png
```

**Visual File Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│  Project Structure                                          │
│                                                             │
│  my-app/                                                    │
│  ├── public/           ← express.static('public')          │
│  │   ├── style.css     → /style.css                        │
│  │   ├── script.js     → /script.js                        │
│  │   └── images/                                           │
│  │       └── logo.png  → /images/logo.png                  │
│  │                                                         │
│  ├── index.js                                               │
│  └── package.json                                           │
│                                                             │
│  Request → Express → Serve file dari folder 'public'       │
└─────────────────────────────────────────────────────────────┘
```

### 3.9 Response Methods

```javascript
// Send string
res.send('Hello');

// Send JSON
res.json({ name: 'John' });

// Send HTML
res.send('<h1>Hello</h1>');

// Set status code
res.status(404).send('Not Found');

// Send file
res.sendFile(__dirname + '/public/index.html');

// Redirect
res.redirect('/home');

// Set header
res.setHeader('Content-Type', 'text/html');
```

### 3.10 Complete Example: REST API

```javascript
// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Mock database
let todos = [
  { id: 1, title: 'Learn Express', completed: false },
  { id: 2, title: 'Build API', completed: false }
];

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET single todo
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// POST new todo
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    title: req.body.title,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update todo
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  
  todo.title = req.body.title;
  todo.completed = req.body.completed;
  
  res.json(todo);
});

// DELETE todo
app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  
  todos.splice(index, 1);
  res.status(204).send();
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 3.11 Best Practices

```javascript
// ✅ Good: Organize routes in separate files
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { /* ... */ });
router.post('/', (req, res) => { /* ... */ });

module.exports = router;

// index.js
const express = require('express');
const app = express();
const usersRouter = require('./routes/users');

app.use('/api/users', usersRouter);

// ✅ Good: Use environment variables
const PORT = process.env.PORT || 3000;

// ✅ Good: Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

// ❌ Bad: No error handling
app.get('/data', (req, res) => {
  throw new Error('Something wrong'); // Server will crash!
});
```

---

## Latihan Praktis

### Exercise 1: Async/Await
Buat function yang:
1. Fetch data dari 3 API berbeda secara parallel
2. Handle errors dengan try-catch
3. Return combined data

### Exercise 2: Event Emitter
Buat class `Counter` yang:
1. Emit event saat count bertambah
2. Emit event saat count mencapai target
3. Bisa di-reset

### Exercise 3: Express.js
Buat REST API untuk:
1. CRUD operations (Create, Read, Update, Delete)
2. Mock data dengan array
3. Validation sederhana

---

## Referensi

- [Express.js Official Docs](https://expressjs.com/)
- [Node.js Event Emitter](https://nodejs.org/api/events.html)
- [MDN: Async/Await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

---

**Happy Coding! 🚀**
