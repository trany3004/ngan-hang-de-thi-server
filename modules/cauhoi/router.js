const express = require('express')
const router = new express.Router()
const handle = require('./handle');
const authen = require('../auth/token');
const ChuDe = require('../model/chude');
const OnTap = require('../model/ontap');
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
        const {size, page, ...rest} = req.query;
        if (rest.cauhoi) {
            rest.cauhoi = { $regex: '.*' + rest.cauhoi + '.*', $options: 'i' }
        }
        if (rest.id || rest._id) rest._id = rest.id || rest._id;
        const rs = await handle.getList(rest, +size, +page);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/:id', async function (req, res) {
    try {
        const rs = await handle.getCauHoi(req.params.id);
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

router.get('/:chude/:mucDo', async function (req, res) {
    const chude = req.params.chude;
    const mucDo = req.params.mucDo;
    try {
        const rs = await handle.createRandomQuestion(chude, mucDo);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }

})

router.post('/submit', async function(req, res) {
    try {
        const rs = await handle.submitAnswer(req.body);
        res.status(200).json(rs);
    } catch (error) {
        res.status(400).json(error);
    }
})

router.post('/ontap/submit', async function(req, res) {
    try {
        const token = req.headers.authorization;
        let isViewMode = false;
        let numberOfRightAnswer = 0;
        if (token) {
            const user = await authen.verify(req.headers);
            if (user && user.role === 'vip') {
                isViewMode = true;
            }
        }

        const ontap = await OnTap.findOne({ chude: req.body.chude})
        

        let rs = await handle.submitMultipleAnswer(req.body.cauhoi);
        rs.forEach((cauHoiDetail) => {
            const isWrongAnswer = cauHoiDetail.dapAn.find((d) => d.wrongAnswer);
            const isRightAnswer = cauHoiDetail.dapAn.find((d) => d.rightAnswer && d.selected);
            if (!isWrongAnswer && isRightAnswer) {
              numberOfRightAnswer += 1;
              cauHoiDetail.rightAnwer = true;
            }
        })
        const result = {
            cauhoi: rs,
            viewRole: isViewMode,
            numberOfRightAnswer: numberOfRightAnswer,
            numberOfWrongAnswer: rs.length - numberOfRightAnswer,
            total: rs.length,
            score: Math.round((numberOfRightAnswer * 10)/rs.length),
            time: ontap.time || 15 * 60 * 60 * 1000
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
})



module.exports = router