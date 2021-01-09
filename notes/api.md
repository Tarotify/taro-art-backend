# API 功能 
>前端通过 Ajax 与后端交互，则 api 的设计应尽量遵循 Restful 风格。

1. 用户
  - 注册（包含上传头像）：POST api/user/signup
  - 登录：POST api/user/signin

2. 用户信息修改
  - 获取：GET api/user/profile
  - 修改：PATCH api/user/profile

3. 文章
  - 获取：GET api/common/posts
  - 查看一篇文章（包含留言）：GET api/common/posts/:postId
  - 发表文章：POST api/common/posts/
  - 修改文章：PATCH api/common/posts/:postId
  - 删除文章：DELETE api/common/posts/:postId

4. 留言
  - 创建留言：POST  api/common/comments




