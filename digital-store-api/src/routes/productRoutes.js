const express = require("express");
const router = express.Router();

const controller = require("../controllers/productController")

function bigIntToJSON(key, value) {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
}

router.get("/", async (req, res) => {
  res.send(await controller.listAll());
});

router.get("/:id", async (req, res) => {
  res.status((await controller.listOne(req.params.id)).status).send(await controller.listOne(req.params.id));
});

router.post("/", async (req, res) => {
  res.status((await controller.create(req.body)).status).send(await controller.create(req.body));
});

router.put("/:id", async (req, res) => {
  res.send(`Edit product: ${req.params.id}`);
});

router.delete("/:id", async (req, res) => {
  res.send(`Delete product: ${req.params.id}`);
});

module.exports = router;