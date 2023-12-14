const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Lista de products");
});

router.get("/:id", (req, res) => {
  res.send(`product: ${req.params.id}`);
});

router.post("/", (req, res) => {
  res.send(`Create product: ${JSON.stringify(req.body)}\n`);
});

router.put("/:id", (req, res) => {
  res.send(`Edit product: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`Delete product: ${req.params.id}`);
});

module.exports = router;