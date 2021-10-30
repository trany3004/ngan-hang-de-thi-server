const express = require('express')
const router = new express.Router()
const handle = require('./handle');
//them mon hoc
router.post('/', async(req, res) => {
    const body = req.body;
    try {
        const rs = await handle.createMonHoc(body.ten);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.put('/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const rs = await handle.updateMonHoc(id, req.body);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})


router.get('/', async function (req, res) {
    try {
        const rs = await handle.getListMonHoc();
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const rs = await handle.deleteMonHoc(id);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }

})

module.exports = router