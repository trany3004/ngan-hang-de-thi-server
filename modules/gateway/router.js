const express = require('express')
const router = new express.Router()
const userHandle = require('../user')
const authHandler = require('../auth')
const monhoc = require('../monhoc')
const khoihoc = require('../khoihoc')
const chude = require('../chude')
const chuong = require('../chuong')


router.post('/login', authHandler.login)
router.use('/user', userHandle.router)

router.use('/mon-hoc', monhoc.router)
router.use('/khoi-hoc', khoihoc.router)
router.use('/chu-de', chude.router)
router.use('/chuong-hoc', chuong.router)
module.exports = router;