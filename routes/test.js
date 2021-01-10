const express = require('express')
const router = express.Router()
const EmailFunction = require('../models/sendgrip')

router.get('/mail', function (req, res) {
  // res.send('hello, ' + req.params.name)
  let param = Math.round(Math.random()*100000) // verification code
  EmailFunction('rrrraymond810@gmail.com', 'Sign Up Msg', 'signUp', param)
  res.status(200).send('已送发')
})


module.exports = router
