module.exports = {
  port: 3000, // port: 程序启动要监听的端口号
  session: { // : express-session 的配置信息
    secret: 'taro',
    key: 'taro',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/taro'  //mongodb 的地址，以 mongodb:// taro 为 db 名
}
