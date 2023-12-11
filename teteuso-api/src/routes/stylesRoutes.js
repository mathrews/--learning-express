const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Lista de styles");
});

router.get("/:id", (req, res) => {
  res.send(`Style: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send(`Criar o style: ${JSON.stringify(req.body)}`);
});

router.put("/:id", (req, res) => {
  res.send(`editar o style: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`deletar o style: ${req.params.id}`);
});

module.exports = router;