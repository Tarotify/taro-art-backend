# API 功能 
>前端通过 Ajax 与后端交互，则 api 的设计应尽量遵循 Restful 风格。

1. 用户
  - 注册（包含上传头像）：POST api/user/signup
  - 登录：POST api/user/signin

2. 用户信息修改
  - 获取：GET api/user/profile
  - 更新：PATCH api/user/profile
  - 密码修改 ：1. 验证邮箱账号：POST api/user/password/pre_reset  
              2. 修改密码 POST api/user/password/reset  

3. 文章
  - 获取：GET api/common/posts
  - 查看一篇文章（包含留言）：GET api/common/posts/:postId
  - 发表文章：POST api/common/posts/
  - 修改文章：PATCH api/common/posts/:postId
  - 删除文章：DELETE api/common/posts/:postId

4. 留言
  - 创建留言：POST  api/common/comments


5. 使用爬虫

6. 使用sendgrid发邮件

7. 使用mongodb存放session

8. 使用redis存放session
