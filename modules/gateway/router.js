const express = require('express')
const router = new express.Router()
const userHandle = require('../user')
const authHandler = require('../auth')
const monhoc = require('../monhoc')
const khoihoc = require('../khoihoc')
const chude = require('../chude')
const chuong = require('../chuong')
const cauhoi = require('../cauhoi')
const ontap = require('../ontap')
const contact = require('../contact')



router.post('/login', authHandler.login)
router.use('/user', userHandle.router)

router.use('/mon-hoc', monhoc.router)
router.use('/khoi-hoc', khoihoc.router)
router.use('/chu-de', chude.router)
router.use('/chuong-hoc', chuong.router)
router.use('/cau-hoi', cauhoi.router)
router.use('/on-tap', ontap.router)
router.use('/contact', contact);


module.exports = router;