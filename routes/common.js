const express = require('express')
const router = express.Router()

const checkStatus = require('../middlewares/check').checkStatus

// GET /signin 登录页
router.get('/signin',  function (req, res, next) {
  res.send('登录用户')
})


// POST /signin 用户登录
router.post('/signin', checkStatus, function (req, res, next) {
  res.send('登录')
})

router.post('/signup', checkStatus, function (req, res, next) {
  res.send('注册')
})

module.exports = router
