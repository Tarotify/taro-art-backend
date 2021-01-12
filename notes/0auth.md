# OAUTH第三方登录
<img src="./oauth.png">

## 例子1：

前端新开一个小窗口，width height可设定
前端向后台请求，并带上当前地址(方便后续跳转回来)。后台返回认证地址及参数，使用window.location.href进行跳转。
```js
  login(){
            this.$axios({
                method: 'get',
                url: '/test/github/login',
                params: {
                    path: 'http://localhost:8080'+this.$route.fullPath
                }
            }).then((res)=>{
                console.log(res)
                window.location.href=res.data;
            })
          }
```

- 后端
```js
const config={
    client_id:'xxxx',    //github生成的ID及密码
    client_secret:'xxxxxxx'
};
let redirectPath='http://localhost:8080/'
router.get('/github/login',async (ctx)=>{
    if(ctx.query.path) redirectPath=ctx.query.path
    var dataStr=(new Date()).valueOf();
    //重定向到认证接口,并配置参数
    var path="https://github.com/login/oauth/authorize";
    path+='?client_id='+config.client_id;
    //将地址及参数返回前端
    ctx.body=path;
    //前端拿就会去访问
});
//认证后的github回调
router.get('/github/callback',async (ctx)=>{
    console.log('callback...')
    const code=ctx.query.code;    //返回的授权码
    const params={
        client_id:config.client_id,
        client_secret: config.client_secret,
        code:code
    }
    //使用这个授权码，向 GitHub 请求令牌
    let res=await axios.post('https://github.com/login/oauth/access_token', params)
    const access_token=querystring.parse(res.data).access_token
    //再通过令牌获取用户信息
    res=await axios.get('https://api.github.com/user?access_token=' + access_token)
    // console.log('userAccess:', res.data)
     // ctx.body = res.data
    ctx.cookies.set('user',res.data.login)  //用户名称
    ctx.cookies.set('icon',res.data.avatar_url)  //用户图片
    ctx.redirect(redirectPath)  //重定向到请求页面
})
```


## 例子2

2.1 前端实现
前端采用了掘金的授权登录方式，当用户点击第三方GitHub登录，弹出一个新窗口

`window.open("/oauth", "", "height=600, width=700")`

在这个新窗口里只需要跳转链接，client_id，redirect_uri 就是之前创建的参数配置自己的就行。

`window.location.href = 'github.com/login/oauth…'`
用户授权登录之后会跳到redirect页面，在redirect请求后端带上刚产生的code，后端拿到code请求github得到的用户信息资料，最后关闭弹窗。

2.2 后端实现
后端作者采用的是Koa2,代码如下
```js
router.get('/oauth', async function(ctx, next) {
  const requestToken = ctx.request.query.code
  const tokenResponse = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${OAUTH_GITHUB.clientID}&` +
      `client_secret=${OAUTH_GITHUB.clientSecret}&` +
      `code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  })
  const accessToken = tokenResponse.data.access_token
  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  })
```
复制代码后面根据自己的业务需求，将获取到的信息存入到用户表中。这里的方式很多，我是直接将github授权登录的信息插入到我的用户表里，或者你新建一个第三方oauth表去存放也是可以的。
```js
const oauthLogin = async (userData = {}) => {
  const username = userData.username
  const nickname = userData.username
  const avatar = userData.avatar
  const date = Date.now()
  const userSql = `select * from users where username = '${username}' `
  const rows = await exec(userSql)
  if (rows.length > 0) {
    return rows[0] || {}
  } else {
    const sql = `insert into users (username,password, nickname, avatar, date) values ('${username}', '${password}', '${nickname}', '${avatar}', '${date}');`
    const insertData = await exec(sql)
  }
}
```