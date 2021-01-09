# nodejs实现token验证

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


1. token的使用场景
无状态请求
保持用户的登录状态
第三方登录（token+auth2.0）
2. 基于token的验证原理
后端不再存储认证信息，而是在用户登录的时候生成一个token，然后返回给前端，前端进行存储，在需要进行验证的时候将token一并发送到后端，后端进行验证

加密的方式：对称加密和非对称加密，对称加密指的是加密解密使用同一个密钥，非对称加密使用公钥和私钥，加密用私钥加密，解密用公钥解密

3. 基于Token的身份验证的过程如下:
客户端：用户名和密码请求登录

服务器：收到请求，验证用户名和密码，验证成功后，分发一个Token返回给客户端

客户端：将Token存储，例如放在 Cookie 里或者 Local Storage 里，后续每次请求，带上此Token

服务器：收到请求，验证Token是否正确，验证成功返回请求数据

4. node + jwt(jsonwebtoken) 搭建token身份验证

安装 OpenSSl http://slproweb.com/products/Win32OpenSSL.html
在 ras 文件 终端夹下输入 openssl
在bin下 生成私钥 private_key.pem
openssl> genrsa -out ./private_key.pem 1024  

在bin下 生成公钥 public_key.pem
openssl> rsa -in ./private_key.pem -pubout -out ./public_key.pem
