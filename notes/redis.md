这样你的Session就转移到了Redis数据库，这样做的一个额外好处是，当你的Express服务器突然重启后，用户仍然可以使用当前Cookie中的SessionID从数据库中获取到他的会话状态，做到会话不丢失，在一定程度上提高网站的键壮性。
如果你的NodeJS网站上的所有缓存数据都转移到了Redis后，就可做到完全状态无关，按需扩展网站的规模。

Redis是现在最受欢迎的NoSQL数据库之一，Redis是一个使用ANSI C编写的开源、包含多种数据结构、支持网络、基于内存、可选持久性的键值对存储数据库，其具备如下特性： 基于内存运行，性能高效 支持分布式，理论上可以无限扩展 key-value存储系统

在node.js(express)中使用Redis持久化存储session

什么是session
session运行在服务器端，当客户端第一次访问服务器时，可以将客户的登录信息保存。 session可以和redis或者数据库等结合做持久化操作，当服务器挂掉时也不会导致某些session信息丢失。
在node(express)中使用session,并且持久化保存在Redis中
安装session模块和Redis模块
在node(express)中使用session需要先安装cookie-parser和express-session模块。 为了持久化保存session我们使用Redis,需要安装redis和connect-redis模块。

### 模块安装方法
```
npm install cookie-parser express-session redis connect-redis --save
```

### Window 安装 
https://github.com/MicrosoftArchive/redis/releases
下载3.2.100版的zip解压到E盘的/redis文件下  
打开cmd到目录下运行 redis-server.exe redis.window.conf 开启

- 普通数据
```js
var redis = require('redis')

var client = redis.createClient(6379, '127.0.0.1')
client.on('error', function (err) {
  console.log('Error ' + err);
});

// 1 键值对
client.set('color', 'red', redis.print); //  Reply: OK
client.get('color', function(err, value) {
  if (err) throw err;
  console.log('Got: ' + value)
  client.quit();
})

>>> Reply: OK
>>> Got: red
```

- 哈希表
```js
client.hmset('kitty', {
  'age': '2-year-old',
  'sex': 'male'
}, redis.print); 
client.hget('kitty', 'age', function(err, value) {
  if (err) throw err;
  console.log('kitty is ' + value);
});

client.hkeys('kitty', function(err, keys) {
  if (err) throw err;
  keys.forEach(function(key, i) {
    console.log(key, i);
  });
  client.quit();
});

>>> Reply: OK
>>> 'kitty is 2-year-old'

>>> age 0
>>> age 1
```

- 存放session

引入配置
// express 模块
```js
var express = require('express');
// session 模块
var cookieParser = require('cookie-parser');
var session = require('express-session');
// redis 模块
var redis   = require('redis');
var client  = redis.createClient('6379', '127.0.0.1');// 默认监听6379端口,'127.0.0.1'为你本地ip(默认不需要修改)
var RedisStore = require('connect-redis')(session);

// 执行express
var app = express();
// 运行cookieParser 方法
app.use(cookieParser());

// redis 链接错误
client.on("error", function(error) {
    console.log(error);
});


//配置 session
var identityKey = 'rediskey';
app.use(session({
    name: identityKey,
    secret: 'sessiontest',  // 用来对session id相关的cookie进行签名
    store: new RedisStore(),  // (使用redis的存储session)
    saveUninitialized: false,  // 是否自动保存未初始化的会话，建议false
    resave: false,  // 是否每次都重新保存会话，建议false
    cookie: {
        maxAge: 10*60 * 1000  // 有效期，单位是毫秒, 这里设置的是10分钟
    }
}));

// 检测 session是否正常
app.use(function (req, res, next) {
    if (!req.session) {
        return next(new Error('session错误'))
    }else {
        console.log(req.session)//正常打印当前session
    }
    next() // 正常 载入下一个中间件
})
```

使用session
读取session
使用req.session.username (username为你储存的session的key名)即可读到当前session中的username对象

设置session
使用req.session.username='yonghuming' 即可为session的username这个key值赋值

express-session的一些其他操作方法:
Session.regenerate() 将已有session初始化。

req.session.regenerate(function(err) {
  // will have a new session here
})
复制代码
Session.destroy() 删除session，当检测到客户端关闭时调用。

req.session.destroy(function(err) {
  // cannot access session here
})
复制代码
Session.save() 保存session。

req.session.save(function(err) {
  // session saved
})
复制代码
Session.reload() 当session有修改时，刷新session。

req.session.reload(function(err) {
  // session updated
})


更多链接：
https://andrewpqc.github.io/2017/09/17/cookie-and-session-in-Express-use-redis-to-make-it-work-better/




六、Redis 订阅发布
发布
```js
client.publish('testPublish', 'message from publish.js');
```
订阅
```js
client.subscribe('testPublish'); 
client.on('message', function(channel, msg){
    console.log('client.on message, channel:', channel, ' message:', msg);
});

>>> 'client.on message, channel: testPublish', 'message': 'message from publish.js'
```
