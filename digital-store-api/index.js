const express = require("express");
const cors = require('cors');
const app = express();
const port = 8000;
const brandRoutes = require("./src/routes/brandRoutes.js");
const categoryRoutes = require("./src/routes/categoryRoutes.js");
const genderRoutes = require("./src/routes/genderRoutes.js");
const productRoutes = require("./src/routes/productRoutes.js");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Seja bem vindo à api da Digital_Store.");
}); //raiz

app.use("/brands", brandRoutes);
app.use("/categories", categoryRoutes);
app.use("/genders", genderRoutes);
app.use("/products", productRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Not found");
}); //ultimo

app.listen(port, () => {
  console.log(`Servidor rodando no link: http://localhost:${port}`);
});
