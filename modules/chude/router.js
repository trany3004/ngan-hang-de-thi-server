const express = require('express')
const router = new express.Router()
const handle = require('./handle');
//them mon hoc
router.post('/', async(req, res) => {
    const body = req.body;
    try {
        const rs = await handle.create(body);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.put('/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const rs = await handle.update(id, req.body);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})


router.get('/mon-hoc/:id', async function (req, res) {
    try {
        const monHocId = req.params.id;
        const rs = await handle.getByMonHoc(monHocId);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/', async function (req, res) {
    try {
        const query = {};
        const {mon, khoi, chuong} = req.query;
        if (mon) {
            query.monhoc = mon;
        }
        if (khoi) query.khoihoc = khoi;
        if (chuong) query.chuong = chuong;
        const rs = await handle.getByMonHocAndKhoiHoc(query);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const rs = await handle.deleteKhoiHoc(id);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }

})

module.exports = router