const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/api/data", (req, res) => {
  const category = req.query.category;
  const filterPrice = req.query.filterPrice;

  res.json({
    message: "Data received",
    category: category,
    filterPrice: filterPrice,
  });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
