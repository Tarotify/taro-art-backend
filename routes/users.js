const express = require('express')
const router = express.Router()

router.get('/:name', function (req, res) {
  res.send('hello, ' + req.params.name)
})

router.post('/', function(req,res) {
  res.send('123')
})

module.exports = router