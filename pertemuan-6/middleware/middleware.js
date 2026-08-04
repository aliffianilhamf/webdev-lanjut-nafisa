const express = require("express");

const app = express();
const PORT = 3000;

// Middleware function to log request details
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);

  next();
});

// middleware function json parser
app.use(express.json());

// Route handler for GET request to "/"
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/data", (req, res) => {
  try {
    //   const data = req.body;
    res.json({ message: "Data received", data });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});

app.get("/error", (req, res) => {
  // Simulate an error
  throw new Error("This is a simulated error");
});

// middleware function to handle 404 errors
app.use((err, req, res, next) => {
  console.log(err.message);

  res.status(500).json({ error: "Internal Server Error" });
});

// run server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
