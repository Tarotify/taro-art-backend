const express = require('express')
const router = express.Router()
const commonRouter = require('./common')
const userRouter = require('./user')
// 引入jwt 用作于登录判断
const jwt = require('../utils/jwt')

// router.get('/', function (req, res) {
//   res.send('123')
// })
// module.exports = router

// 直接对外暴露一个方法
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send({'status': 200})
  })

  app.use((req,res,next)=>{
    // 如果是需要携带token才能访问的路径
    if(req.url.startsWith('/api/user/signup')) {
      next()
    }
    else if(req.url.startsWith('/api/user')) {
        console.log('验证token')
        // 获取请求头中的token
        let token = req.headers.token
        // 验证【解析】token
        let result = new jwt(token).verifyToken()
        // 验证结果处理
        if (result.name == 'TokenExpiredError') {// 如果返回结果的name属性是TokenExpiredError，则说明token已超时
            res.send({"code":403,"msg":"token超时"})
        } else if (result.name == 'JsonWebTokenError') { // 如果返回结果是JsonWebTokenError，则说明token不对
            res.send({"code":403,"msg":"token错误"})
        } else { // 如果正确解析了数据对象，将数据对象赋值给data，继续执行
           next()
        }
    } else {
        next()
    }
  })

  app.use('/api/common', commonRouter)
  app.use('/api/user', userRouter)
  // app.use('/signout', require('./signout'))
  // app.use('/posts', require('./posts'))
  // app.use('/comments', require('./comments'))
}

