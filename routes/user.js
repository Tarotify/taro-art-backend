const express = require('express')
const router = express.Router()
const fs = require('fs')
const { now } = require('moment')
const path = require('path')
const sha1 = require('sha1')
const moment = require('moment')
const jwt = require('../utils/jwt')

const UserModel = require('../models/User')
const checkStatus = require('../middlewares/check').checkStatus
const checkLoginStatus = require('../middlewares/check').checkLoginStatus

// POST /signin 用户登录
router.post('/signin', function (req, res, next) {
  const email = req.fields.email
  const password = req.fields.password

  UserModel.getUserByEmail(email)
    .then((user) => {
      if(!user) {
        res.send({status: '401', msg:'邮箱不存在！'})
      }
      else if(sha1(password) !== user.password) {
        res.send({status: '401', msg: '密码不正确'})
      }else{
        // 用户信息写入 session
        // delete user.password
        // req.session.user = user

        // 用户信息生成token,返回前端存起来
        const token = new jwt(user).generateToken()
        res.send({status:200, data:{token}})
      }
    })
    .catch(next)
})


// POST /signout 用户录出
router.post('/signout', function (req, res, next) {
    // 前端把Stroage里token清空就可以，不用掉接口；下次请求就没登录状态
})


/**
 * 用户注册
 */
router.post('/signup', function (req, res, next) {
  console.log('signup')
  const email = req.fields.email
  const name = req.fields.name
  const age = req.fields.age
  const phone = req.fields.phone
  // const avatar = req.files.avatar.path.split(path.sep).pop()
  let password = req.fields.password

  // 明文密码加密
  password = sha1(password) //sha1 并不是一种十分安全的加密方式，实际开发中可以使用更安全的 bcrypt 或 scrypt 加密。

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
      // 此 new_user 是插入 mongodb 后的值，包含 _id
      let new_user = result.ops[0]

      // 删除密码这种敏感信息，将用户信息存入 session （新方法，不存session 用token)
      delete new_user.password
      // req.session.user = new_user
      // console.log(req.session)

      // 用注册信息生成token
      let token = new jwt(new_user).generateToken()
      res.status(200).send({
        data: new_user,
        token,
        status_code: 200,
      })
    })
    .catch((e) => {
      // 注册失败，异步删除上传的头像
      // fs.unlink(req.files.avatar.path)
      // 邮箱被占用则跳回注册页，而不是错误页
      if (e.message.match('duplicate key')) {
        // req.flash('error', '邮箱已注册')
        res.status(409).send({msg:'邮箱已注册'})
      }
      next(e)
    })
})



/**
 * 查看用户个人信息
 */

router.get('/profile', checkLoginStatus, function(req,res,next) {
  let token = req.headers.token
  let user_data = new jwt(token).verifyToken()
  res.status(200).send({status_code:200, data: user_data})
})



/**
 * 修改用户个人信息
 */

router.patch('/profile', checkLoginStatus, function(req,res,next) {
  let age = parseInt(req.fields.age)
  let password = req.fields.password
  let new_password = req.fields.new_password
  let name = req.fields.name
  let user = req.fields.email

  let token = req.headers.token
  let user_data = new jwt(token).verifyToken()

  // 旧密码验证通过
  if (user_data.password === sha1(password)) {
    if (new_password !== null && password !== new_password) {
      password = new_password
    }
  }

  password = sha1(password)


  let new_info = {
    name,
    password,
    age
  }
  UserModel.updateInfo(user,new_info)
    .then((result) => {
      console.log(result)
      if(result.modifiedCount === 1 && result.matchedCount === 1 ) {

         // 拿新user信息更新token 给回前端更新
        user_data.password = new_info.password
        user_data.age = new_info.age
        user_data.name = new_info.name
        let new_token = new jwt(user_data).generateToken()

        res.status(200).send({status_code:200, data: {new_info}, token: new_token})
      }
      else if (result.modifiedCount === 0 && result.matchedCount === 1 ) {
        res.status(200).send({status_code:200, msg:'没有信息更新'})
      }
    })
})





















module.exports = router
