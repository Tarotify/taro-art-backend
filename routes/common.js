const express = require('express')
const router = express.Router()

router.get('/:id', function (req, res) {
  // res.send('hello, ' + req.params.name)
  let a = JSON.stringify(req.params)
  res.status(200).send({data:a, status_code:200})
})
// GET  登录页
router.get('/test',  function (req, res, next) {
  res.send('test')
})

router.post('/', function(req,res,next) {
  res.send('123')
  next()
})

module.exports = router
