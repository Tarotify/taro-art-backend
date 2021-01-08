const express = require('express')
const app = express()
const routes = require('./routes')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const config = require('config-lite')(__dirname)
const pkg = require('./package.json')

// 路由  把路由文件封装成函数加载过来 路由函数接收app来进行处理，不直接在index写路由入口

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}))

routes(app)


// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})



// 注意：中间件的加载顺序很重要。如上面设置静态文件目录的中间件应该放到 routes(app) 之前加载，这样静态文件的请求就不会落到业务逻辑的路由里；flash 中间件应该放到 session 中间件之后加载，因为 flash 是基于 session 实现的。
