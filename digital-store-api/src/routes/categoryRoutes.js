const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Lista de categories");
});

router.get("/:id", (req, res) => {
  res.send(`Category: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send(`Criar a category: ${JSON.stringify(req.body)}`);
});

router.put("/:id", (req, res) => {
  res.send(`editar a category: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`deletar a category: ${req.params.id}`);
});

module.exports = router;