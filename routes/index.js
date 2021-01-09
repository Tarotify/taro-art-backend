const express = require('express')
const router = express.Router()
const commonRouter = require('./common')
const userRouter = require('./user')
const testRouter = require('./test')



// 直接对外暴露一个方法
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send('♥♥♥♥♥ What\'s up taro !!!!!')
  })


  /**改版写到中间件，middleware里统一验证 */
  // app.use((req,res,next)=>{
  //   // 如果是需要携带token才能访问的路径
  //   if(req.url.startsWith('/api/user/signup')) {
  //     next()
  //   }
  //   else if(req.url.startsWith('/api/user')) {
  //       console.log('验证token')
  //       // 获取请求头中的token
  //       let token = req.headers.token
  //       // 验证【解析】token
  //       let result = new jwt(token).verifyToken()
  //       // 验证结果处理
  //       if (result.name == 'TokenExpiredError') {// 如果返回结果的name属性是TokenExpiredError，则说明token已超时
  //           res.send({"code":403,"msg":"token超时"})
  //       } else if (result.name == 'JsonWebTokenError') { // 如果返回结果是JsonWebTokenError，则说明token不对
  //           res.send({"code":403,"msg":"token错误"})
  //       } else { // 如果正确解析了数据对象，将数据对象赋值给data，继续执行
  //          next()
  //       }
  //   } else {
  //       next()
  //   }
  // })

  app.use('/api/common', commonRouter)
  app.use('/api/user', userRouter)
  app.use('/api/test', testRouter)
  // app.use('/posts', require('./posts'))
  // app.use('/comments', require('./comments'))
}

