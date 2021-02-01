# 注册&忘记密码
- 验证邮箱验证码
  1. 后端生成得验证通过设置`req.session.verifyCode`让前端收到的response里有`set-cookies`
  2. 前端会自动存在coolkie里，当再次发送请求给后端的时候，后端直接通过`req.session.verifyCode`可以取回生成的验证码
  3. 后端用前端用户输入的验证码和`req.session.verifyCode`来进行对比


# 用户登录状态
- 前端每次都通过在cookie拿token调用user/session的接口来获取详情信息
