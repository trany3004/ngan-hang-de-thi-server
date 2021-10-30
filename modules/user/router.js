const express = require('express')
const router = new express.Router()
const handle = require('./handle');

router.post('/', async(req, res) => {
    const body = req.body;
    try {
        const rs = await handle.createUser(body);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.put('/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const rs = await handle.updateUser(id, req.body);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})


router.get('/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const rs = await handle.getUser(id);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const rs = await handle.deleteUser(id);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }

})

module.exports = router