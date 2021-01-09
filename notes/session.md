由于 HTTP 协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识别具体的用户，这个机制就是会话（Session）
cookie 与 session 的区别
cookie 存储在浏览器（有大小限制），session 存储在服务端（没有大小限制）
通常 session 的实现是基于 cookie 的，session id 存储于 cookie 中
session 更安全，cookie 可以直接在浏览器查看甚至编辑


// req.session 初始值为 {}，当我们登录后设置 req.session.user = 用户信息，返回浏览器的头信息中会带上 set-cookie 将 session id 写到浏览器 cookie 中，那么该用户下次请求时，通过带上来的 cookie 中的 session id 我们就可以查找到该用户，并将用户信息保存到 req.session.user
// express-session: 会话（session）支持中间件
// connect-mongo: 将 session 存储于 mongodb，需结合 express-session 使用，我们也可以将 session 存储于 redis，如 connect-redis




nodejs实现token验证

http无状态
每次http请求所获得的资源，在请求结束后就会释放

cookie + session验证机制
1、服务端将数据库查询出的数据存储到session中，并且生成随机session_id随着响应结果返回给客户端端
2、客户端将session_id存储到cookie
3、客户端发起请求时，自动携带cookie

⚠️ 移动端没有cookie

token + localstorage/sessionstorage验证机制
机制流程
1、客户端发送登录请求后，服务端到数据库获取数据对象
2、服务端使用jwt（jsonwebtoken）将数据对象转为token（一个随机字符串），并将token随着响应结果返回到客户端
3、客户端将token存储到localstorage或sessionstorage中
4、客户端访问需要权限的页面时，在请求头中携带token发起请求
5、服务端使用jwt将token解析为数据对象

localstorage和sessionstorage区别
localstorage：记住密码时使用，即使浏览器关闭，依然存在
sessionstorage：不记住密码时使用，浏览器关闭则释放
