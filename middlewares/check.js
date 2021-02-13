/*
  把用户状态的检查封装成一个中间件，

  在每个需要权限控制的路由加载该中间件，即可实现页面的权限控制。
  在每个需要验证登录状态的路由加载该中间件，既可实现登录状态检测

  在 根目录 下新建 middlewares
  目录，在该目录下新建 check.js，添加如下代码：
*/

const jwt = require('../utils/jwt')

// 方法接受路由的req,res,next参数
module.exports = {
  checkRole: function checkRole (req, res, next){
    if (!req.session.user) {
       {islogin: 0}
    }else{
       {islogin: 1}
    }
    next()
  },
  checkLoginStatus: function checkLoginStatus (req,res,next) {
    console.log('验证token')
    // 获取请求头中的token
    let token = req.headers.authorization
    console.log(token)
    // 验证【解析】token
    let result = new jwt(token).verifyToken()
    // 验证结果处理
    if (result.name === 'TokenExpiredError') {// 如果返回结果的name属性是TokenExpiredError，则说明token已超时
        res.send({"status_code":401,"msg":"token超时"})
    } else if (result.name === 'JsonWebTokenError') { // 如果返回结果是JsonWebTokenError，则说明token不对
        res.send({"status_code":401,"msg":"token错误"})
    } else { // 如果正确解析了数据对象，将数据对象赋值给data，继续执行
        console.log('验证token通过')
        next()
    }
  }
}
