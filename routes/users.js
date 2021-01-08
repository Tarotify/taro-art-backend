const express = require('express')
const router = express.Router()

router.get('/:id', function (req, res) {
  // res.send('hello, ' + req.params.name)
  let a = JSON.stringify(req.params)
  res.send(a)
})

router.post('/', function(req,res,next) {
  res.send('123')
  next()
})

module.exports = router
