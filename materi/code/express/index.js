// =========================================
// MODULE 4: INTRO TO EXPRESS.JS
// =========================================

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// -----------------------------------------
// MIDDLEWARE
// -----------------------------------------

// 1. Built-in middleware untuk parse JSON
app.use(express.json());

// 2. Built-in middleware untuk parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// 3. Custom middleware - Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 4. Custom middleware - Add timestamp to request
app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});

// 5. Custom middleware - Check authentication (simulasi)
app.use('/api/protected', (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer secret-token') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

// -----------------------------------------
// MOCK DATABASE
// -----------------------------------------

let todos = [
  { id: 1, title: 'Learn Express', completed: false },
  { id: 2, title: 'Build REST API', completed: true },
  { id: 3, title: 'Deploy Application', completed: false }
];

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

// -----------------------------------------
// ROUTES: ROOT
// -----------------------------------------

app.get('/', (req, res) => {
  res.send('<h1>Welcome to Express.js!</h1><p>Try /api/todos or /api/users</p>');
});

// -----------------------------------------
// ROUTES: TODOS (REST API)
// -----------------------------------------

// GET all todos
app.get('/api/todos', (req, res) => {
  console.log(`[${req.requestTime}] GET /api/todos`);
  res.json(todos);
});

// GET single todo by ID
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  res.json(todo);
});

// POST create new todo
app.post('/api/todos', (req, res) => {
  const { title, completed } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    title,
    completed: completed || false
  };
  
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update todo (full update)
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const { title, completed } = req.body;
  todos[todoIndex] = {
    id,
    title,
    completed: completed !== undefined ? completed : todos[todoIndex].completed
  };
  
  res.json(todos[todoIndex]);
});

// PATCH update todo (partial update)
app.patch('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const { title, completed } = req.body;
  
  if (title !== undefined) todos[todoIndex].title = title;
  if (completed !== undefined) todos[todoIndex].completed = completed;
  
  res.json(todos[todoIndex]);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(todoIndex, 1);
  res.status(204).send();
});

// -----------------------------------------
// ROUTES: USERS
// -----------------------------------------

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// POST create new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users.splice(userIndex, 1);
  res.status(204).send();
});

// -----------------------------------------
// ROUTES: QUERY PARAMETERS & HEADERS
// -----------------------------------------

app.get('/search', (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  
  res.json({
    query: q,
    page: parseInt(page),
    limit: parseInt(limit),
    results: todos.slice(0, limit)
  });
});

app.get('/headers', (req, res) => {
  res.json({
    headers: req.headers,
    timestamp: req.requestTime
  });
});

// -----------------------------------------
// ROUTES: STATUS CODES
// -----------------------------------------

app.get('/status', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

app.get('/created', (req, res) => {
  res.status(201).json({ message: 'Resource created' });
});

app.get('/bad-request', (req, res) => {
  res.status(400).json({ error: 'Bad request' });
});

app.get('/unauthorized', (req, res) => {
  res.status(401).json({ error: 'Unauthorized' });
});

app.get('/forbidden', (req, res) => {
  res.status(403).json({ error: 'Forbidden' });
});

app.get('/not-found', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// -----------------------------------------
// ROUTES: REDIRECT
// -----------------------------------------

app.get('/redirect', (req, res) => {
  res.redirect('/api/todos');
});

// -----------------------------------------
// ERROR HANDLING MIDDLEWARE
// -----------------------------------------

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: err.message || 'Internal Server Error',
    timestamp: req.requestTime
  });
});

// -----------------------------------------
// SERVE STATIC FILES
// -----------------------------------------

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------------------
// START SERVER
// -----------------------------------------

app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`  Express.js Server Running`);
  console.log(`========================================`);
  console.log(`  Port: ${PORT}`);
  console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`========================================\n`);
  console.log('Available Routes:');
  console.log('  GET    /                  - Welcome page');
  console.log('  GET    /api/todos         - Get all todos');
  console.log('  GET    /api/todos/:id     - Get single todo');
  console.log('  POST   /api/todos         - Create todo');
  console.log('  PUT    /api/todos/:id     - Update todo (full)');
  console.log('  PATCH  /api/todos/:id     - Update todo (partial)');
  console.log('  DELETE /api/todos/:id     - Delete todo');
  console.log('  GET    /api/users         - Get all users');
  console.log('  POST   /api/users         - Create user');
  console.log('  DELETE /api/users/:id     - Delete user');
  console.log('  GET    /search?q=...      - Search with query params');
  console.log('  GET    /headers           - View request headers');
  console.log('  GET    /status            - Return 200 OK');
  console.log('  GET    /created           - Return 201 Created');
  console.log('  GET    /bad-request       - Return 400 Bad Request');
  console.log('  GET    /unauthorized      - Return 401 Unauthorized');
  console.log('  GET    /forbidden         - Return 403 Forbidden');
  console.log('  GET    /not-found         - Return 404 Not Found');
  console.log('  GET    /redirect          - Redirect to /api/todos');
  console.log('  GET    /api/protected     - Protected route (requires auth)');
  console.log(`  GET    /style.css          - Static file`);
  console.log(`\nOpen http://localhost:${PORT} in your browser\n`);
});
