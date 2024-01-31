const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

router.get('/', async (req, res) => {
    return res.send(await controller.listAll());
})

router.post('/', async (req, res) => {
    return res.send(await controller.create(req.body));
})

router.post('/login', async (req, res) => {
    return res.send(await controller.login(req.body));
});

router.put('/:id', async (req, res) => {
    return res.send(await controller.editUser(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    return res.status(200).send(await controller.destroy(req.params.id))
})

module.exports = router;