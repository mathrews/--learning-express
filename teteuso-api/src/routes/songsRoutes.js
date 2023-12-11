const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Lista de songs");
});

router.get("/:id", (req, res) => {
  res.send(`Song: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send(`Criar a song: ${JSON.stringify(req.body)}`);
});

router.put("/:id", (req, res) => {
  res.send(`editar a song: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`deletar a song: ${req.params.id}`);
});

module.exports = router;