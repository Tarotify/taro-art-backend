# API 功能 
>前端通过 Ajax 与后端交互，则 api 的设计应尽量遵循 Restful 风格。

1.  注册i
  -  注册（包含上传头像）：POST /signup

2. 登录
  - 登录：POST /signin
  - 登出：POST /signout

3. 文章
  - 获取：GET /posts
  - 个人主页：GET /posts?author=xxx
  - 查看一篇文章（包含留言）：GET /posts/:postId
  - 发表文章：POST /posts/
  - 修改文章：PATCH /posts/:postId
  - 删除文章：DELETE /posts/:postId

4. 留言
  - 创建留言：POST  /comments


由于 HTTP 协议是无状态的协议，所以服务端需要记录用户的状态时，就需要用某种机制来识别具体的用户，这个机制就是会话（Session）
cookie 与 session 的区别
cookie 存储在浏览器（有大小限制），session 存储在服务端（没有大小限制）
通常 session 的实现是基于 cookie 的，session id 存储于 cookie 中
session 更安全，cookie 可以直接在浏览器查看甚至编辑

