const express = require('express')
const router = express.Router()
const fs = require('fs')
const { now } = require('moment')
const path = require('path')
const sha1 = require('sha1')
const moment = require('moment')

const UserModel = require('../models/users')
const checkStatus = require('../middlewares/check').checkStatus

// GET  登录页
router.get('/test',  function (req, res, next) {
  res.send('test')
})


// POST /signin 用户登录
router.post('/signin', checkStatus, function (req, res, next) {
  const email = req.fields.email
  const password = req.fields.password

  UserModel.getUserByEmail(email)
    .then((user) => {
      if(!user) {
        res.send({status: '401', msg:'邮箱不存在！'})
      }
      if(sha1(password) !== user.password) {
        res.send({status: '401', msg: '密码不正确'})
        return
      }else{
        // 用户信息写入 session
        delete user.password
        req.session.user = user
        res.send({status:200})
      }
    })
    .catch(next)
})


// POST /signout 用户录出
router.post('/signout', checkStatus, function (req, res, next) {
   // 清空 session 中用户信息
   req.session.user = null

   // 登出成功后跳转到主页
   res.send({status: 200})
})

router.post('/signup', checkStatus, function (req, res, next) {
  console.log('signup')
  const email = req.fields.email
  const name = req.fields.name
  const age = req.fields.age
  const phone = req.fields.phone
  // const avatar = req.files.avatar.path.split(path.sep).pop()
  const password = req.fields.password

  // 明文密码加密
  // password = sha1(password) //sha1 并不是一种十分安全的加密方式，实际开发中可以使用更安全的 bcrypt 或 scrypt 加密。

  // 待写入数据库的用户信息]
  let now = moment().format('YYYY-MM-DD HH:mm:ss')

  let user = {
    name: name,
    password: password,
    email: email,
    age: parseInt(age),
    // avatar: avatar,
    phone: phone,
    create_date: now
  }

  UserModel.create(user)
    .then((result) => {
      // 此 user 是插入 mongodb 后的值，包含 _id
      console.log(result)
      let new_user = result.ops[0]
      // 删除密码这种敏感信息，将用户信息存入 session
      delete new_user.password
      res.status(200).send({
        data: new_user,
        status_code: 200,
      })
    })
    .catch((e) => {
      // 注册失败，异步删除上传的头像
      // fs.unlink(req.files.avatar.path)
      // 用户名被占用则跳回注册页，而不是错误页
      if (e.message.match('duplicate key')) {
        // req.flash('error', '邮箱已注册')
        res.status(409).send({msg:'邮箱已注册'})
      }
      next(e)
    })
})

module.exports = router
