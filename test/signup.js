const app = require('../index')
const path = require('path')
const assert = require('assert')
const request = require('supertest')
const User = require('../lib/mongo').User


const testName1 = 'taro01'
const testName2 = 'taro02'
describe('signup', function () {
  describe('POST /user/signup', function () {
    const agent = request.agent(app)// persist cookie when redirect
    beforeEach(function (done) {
      // 创建一个用户
      let now = momont().format('YYYY-MM-DD HH-mm-ss')
      User.create({
        name: testName1,
        password: '123456',
        email: taro01+'@test.com',
        age: 4,
        phone: 9174216210,
        create_date: now
      })
        .exec()
        .then(function () {
          done()
        })
        .catch(done)
    })

    afterEach(function (done) {
      // 删除测试用户
      User.deleteMany({ name: { $in: [testName1, testName2] } })
        .exec()
        .then(function () {
          done()
        })
        .catch(done)
    })

    after(function (done) {
      process.exit()
    })

     // 注册成功的情况
     it('success', function (done) {
      agent
        .post('/signup')
        .type('application/x-www-form-urlencoded')
        .field({ name: testName2,  password: '123456', email: taro01+'@test.com', age: 4, phone: 9174216210, create_date: now  })
        .redirects()
        .end(function (err, res) {
          if (err) return done(err)
          assert(res.text.match(/注册成功/))
          done()
        })
    })

  })
})
