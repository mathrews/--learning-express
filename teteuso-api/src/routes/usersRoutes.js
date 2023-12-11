const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Lista de users");
});

router.get("/:id", (req, res) => {
  res.send(`User: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send(`Criar o user: ${JSON.stringify(req.body)}`);
});

router.put("/:id", (req, res) => {
  res.send(`editar o user: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`deletar o user: ${req.params.id}`);
});

module.exports = router;