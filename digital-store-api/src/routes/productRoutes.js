const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController")

router.get("/", async (req, res) => {
  res.send(await controller.listAll());
});

router.get("/:id", async (req, res) => {
  res.status((await controller.listOne(req.params.id)).status).send(await controller.listOne(req.params.id));
});

router.post("/", async (req, res) => {
  res.send(`Create product: ${JSON.stringify(req.body)}\n`);
});

router.put("/:id", async (req, res) => {
  res.send(`Edit product: ${req.params.id}`);
});

router.delete("/:id", async (req, res) => {
  res.send(`Delete product: ${req.params.id}`);
});

module.exports = router;