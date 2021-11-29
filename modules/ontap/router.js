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
router.get('/', async function (req, res) {
    try {
        const rs = await handle.getOnTap(req.query);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.delete('/:id', async function (req, res) {
    const id = req.params.id;
    try {
        const rs = await handle.deleteObject(id);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }

})

router.post('/random', async function (req, res) {
    const body = req.body;
    if (!body.chude) throw 'Chu đề là bắt buộc';
    if (!body.mucDoList) throw 'Danh sách mức độ là bắt buộc'
    try {
        const rs = await handle.createRandomQuestion(body);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }

})

module.exports = router