module.exports = {
  port: 3000,
  session: {
    secret: 'taro',
    key: 'taro',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/taro'
}
