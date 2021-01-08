const express = require('express')
const app = express()
const routes = require('./routes')
// const indexRouter = require('./routes/index')
// const userRouter = require('./routes/user')
// const signinRouter = require('./routes/signin')

// app.use('/', indexRouter)
//  app.use('/users', userRouter)
// app.use('/signIn', signinRouter)


// 路由  把路由文件封装成函数加载过来 路由函数接收app来进行处理，不直接在index写路由入口
routes(app)
app.listen(3000)
