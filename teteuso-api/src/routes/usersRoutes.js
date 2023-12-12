const express = require("express");
const router = express.Router();
const mariadb = require('mariadb');
const queryDatabase = require("../connection/query");

function bigIntToJSON(key, value) {
  if (typeof value === 'bigint') {
    return value.toString();
  }
  return value;
}

router.get("/", async (req, res) => {
  try {
    const result = await queryDatabase(`SELECT * FROM users;`);
    const stringfiedResult = JSON.stringify(result, bigIntToJSON)
    res.send((stringfiedResult)); // ou res.json(result) dependendo do formato da resposta
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send({ error: 'Erro interno do servidor'});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await queryDatabase(`SELECT * FROM users WHERE ID = ${req.params.id};`);
    const stringfiedResult = JSON.stringify(result, bigIntToJSON)
    res.send((stringfiedResult)); // ou res.json(result) dependendo do formato da resposta
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).send({ error: 'Erro interno do servidor'});
  }
});

router.post("/", (req, res) => {
  res.send(`Criou o user: ${JSON.stringify(req.body)}`);
});

router.put("/:id", (req, res) => {
  res.send(`editar o user: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  res.send(`deletar o user: ${req.params.id}`);
});

module.exports = router;