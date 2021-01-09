/*
  把用户状态的检查封装成一个中间件，
  在每个需要权限控制的路由加载该中间件，即可实现页面的权限控制。
  在 myblog 下新建 middlewares
  目录，在该目录下新建 check.js，添加如下代码：
*/



module.exports = {
  checkStatus: function checkLogin (req, res, next){
    if (!req.session.user) {
       {islogin: 0}
    }else{
       {islogin: 1}
    }
    next()
  }
}
