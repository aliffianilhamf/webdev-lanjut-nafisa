const express = require("express");
const itemRoute = require("./src/routes/itemRoute");

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Use the itemRoute for handling item-related routes
app.use("/api/items", itemRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
