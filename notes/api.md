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




