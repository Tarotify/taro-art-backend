const express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.send('1223')
  next()
  res.status(200).end()
})

module.exports = router
