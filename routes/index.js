const express = require('express')
const router = express.Router()
const commonRouter = require('./common')
const userRouter = require('./users')

// router.get('/', function (req, res) {
//   res.send('123')
// })
// module.exports = router

// 直接对外暴露一个方法
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send({'status': 200})
  })
  app.use('/common', commonRouter)
  app.use('/user', userRouter)
  // app.use('/signout', require('./signout'))
  // app.use('/posts', require('./posts'))
  // app.use('/comments', require('./comments'))
}

