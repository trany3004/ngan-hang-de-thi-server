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
        const {mon, monhoc, khoi, khoihoc, chuong, id, ten} = req.query;
        if (mon || monhoc) {
            query.monhoc = mon|| monhoc;
        }
        if (khoi || khoihoc) query.khoihoc = khoi || khoihoc;

        if (chuong) query.chuong = chuong;
        if (ten) query.ten = {$regex: `.*${ten}.*`, $options: 'i'};
        if(id) query._id = id;
        console.log('querrrrrrrrrrr >>>>', query);
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