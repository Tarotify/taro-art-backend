现在我们来实现日志功能，日志分为正常请求的日志和错误请求的日志，我们希望实现这两种日志都打印到终端并写入文件。

## 4.13.1 winston 和 express-winston

我们使用 [winston](https://www.npmjs.com/package/winston) 和 [express-winston](https://www.npmjs.com/package/express-winston) 记录日志。

新建 logs 目录存放日志文件，修改 index.js，在：

**index.js**

```js
const pkg = require('./package')
```

下引入所需模块：

```js
const winston = require('winston')
const expressWinston = require('express-winston')
```

将：

```
// 路由
routes(app)
```

修改为：

```js
// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))
// 路由
routes(app)
// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))
```

刷新页面看一下终端输出及 logs 下的文件。
可以看出：winston 将正常请求的日志打印到终端并写入了 `logs/success.log`，将错误请求的日志打印到终端并写入了 `logs/error.log`。

> 注意：记录正常请求日志的中间件要放到 `routes(app)` 之前，记录错误请求日志的中间件要放到 `routes(app)` 之后。

## 4.13.2 .gitignore

如果我们想把项目托管到 git 服务器上（如: [GitHub](https://github.com)），而不想把线上配置、本地调试的 logs 以及 node_modules 添加到 git 的版本控制中，这个时候就需要 .gitignore 文件了，git 会读取 .gitignore 并忽略这些文件。在 myblog 下新建 .gitignore 文件，添加如下配置：

**.gitignore**

```
config/*
!config/default.*
npm-debug.log
node_modules
coverage
```

需要注意的是，通过设置：

```
config/*
!config/default.*
```

这样只有 config/default.js 会加入 git 的版本控制，而 config 目录下的其他配置文件则会被忽略，因为把线上配置加入到 git 是一个不安全的行为，通常你需要本地或者线上环境手动创建 config/production.js，然后添加一些线上的配置（如：mongodb 配置）即可覆盖相应的 default 配置。

> 注意：后面讲到部署到 Heroku 时，因为无法登录到 Heroku 主机，所以可以把以下两行删掉，将 config/production.js 也加入 git 中。
> 
> ```
> config/*
> !config/default.*
> ```

然后在 public/img 目录下创建 .gitignore：

```
# Ignore everything in this directory
*
# Except this file
!.gitignore
```

这样 git 会忽略 public/img 目录下所有上传的头像，而不忽略 public/img 目录。同理，在 logs 目录下创建 .gitignore 忽略日志文件：

```
# Ignore everything in this directory
*
# Except this file
!.gitignore
```
