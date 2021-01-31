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
const EmailFunction = require('../models/Sendgrip')

// POST /signin 用户登录
router.post('/signin', function (req, res, next) {
  const email = req.fields.email
  const password = req.fields.password

  UserModel.getUserByEmail(email)
    .then((user) => {
      if(!user) {
        res.status(200).send({status_code: 400, msg:'邮箱不存在！'})
      }
      else if(sha1(password) !== user.password) {
        res.send({status_code: 401, msg: '密码不正确'})
      }else{
        // 用户信息写入 session
        // delete user.password
        // req.session.user = user

        // 用户信息生成token,返回前端存起来
        const token = new jwt(user).generateToken()
        res.status(200).send({status_code:200, data:{token}})
      }
    })
    .catch(next)
})

/**
* POST /signout 用户录出
*/
router.post('/signout', function (req, res, next) {
    // 前端把Stroage里token清空就可以，不用掉接口；下次请求就没登录状态
})


/**
 *  用户注册, 邮箱验证 Step one
 */
router.post('/signup/check', function(req,res,next) {
  const email = req.fields.email
  // 检验email是否已被注册
  UserModel.getUserByEmail(email)
  .then((user) => {
    if(!user) {
      let param = Math.round(Math.random()*100000) // verification code
      EmailFunction(email, 'Taro - Account Passwrod Reset Notification', 'password_reset', param)
      // 写入session
      // 前端会有个set-cookies, 把verifycode存进cookie,在下一步改密验证里的接口前端就会直接带上cookie里的verifyCode请求
      req.session.verifyCode = param
      res.status(200).send({status_code: 200, msg:'已发送'})
    }else{
      res.status(200).send({status_code: 400, msg:'该邮箱已注册'})
    }
  })
})

/**
 * 用户注册 Step two
 */
router.post('/signup', function (req, res, next) {
  console.log('signup')
  const email = req.fields.email
  const name = req.fields.name
  const age = req.fields.age
  const phone = req.fields.phone
  // const avatar = req.files.avatar.path.split(path.sep).pop()
  let password = req.fields.password
  const code = req.fields.code
  const email_code = req.session.verifyCode
  // 再一次验证码
  if(parseInt(code) !== email_code) {
    res.status(200).send({status_code:401, msg:'注册失败,验证码错误'})
  }
  // 明文密码加密
  password = sha1(password) //sha1 并不是一种十分安全的加密方式，实际开发中可以使用更安全的 bcrypt 或 scrypt 加密。

  // 待写入数据库的用户信息]
  let now = moment().format('YYYY-MM-DD HH:mm:ss')

  let user = {
    name: name,
    password: password,
    email: email,
    age: parseInt(age),
    avatar: '',
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
        res.status(200).send({status_code: 400, msg:'该邮箱已注册'})
      }else{
        res.status(200).send({status_code: 500, msg:'注册错误，请联系Taro'})
      }
      next(e)
    })
})


/**
 * 验证用户登录状态 前端cookie是否有token
 */

router.post('/session', function(req,res,next) {
  let token = req.fields.token
  let user_data = new jwt(token).verifyToken()
  res.status(200).send({status_code:200, data: user_data})
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


/**
 *  用户密码修改, 邮箱验证 Step one
 */
router.post('/password/pre_reset', function(req,res,next) {
  const email = req.fields.email
  // 检验email是否存中
  UserModel.getUserByEmail(email)
  .then((user) => {
    if(user) {
      let param = Math.round(Math.random()*100000) // verification code
      EmailFunction(email, 'Taro - Account Passwrod Reset Notification', 'password_reset', param)
      // 写入session
      // 前端会有个set-cookies, 把verifycode存进cookie,在下一步改密验证里的接口前端就会直接带上cookie里的verifyCode请求
      req.session.verifyCode = param
      res.status(200).send({status_code: 200, msg:'已发送'})
    }else{
      res.status(200).send({status_code: 401, msg:'该邮箱未注册'})
    }
  })
})

/**
 *  用户密码修改, 邮箱验证 Step two
 */
router.post('/password/reset', function(req,res,next) {
  const email = req.fields.email
  let password = req.fields.password
  const code = req.fields.code
  const email_code = req.session.verifyCode
  // 再一次验证码
  if(parseInt(code) !== email_code) {
    res.status(200).send({status_code:401, msg:'修改失败,验证不通过'})
  }
  // 检验email是否存中
  UserModel.getUserByEmail(email)
  .then((user) => {
    if(user) {
      //转换密码
      password = sha1(password)
      UserModel.changePassword(user.email,password).then(result => {
        if(result.modifiedCount === 1 && result.matchedCount === 1 ) {
          res.status(200).send({status_code:200})
        }
        else{
          res.status(200).send({status_code:400, msg:'修改失败'})
        }
      })
    }
    else{
      res.status(200).send({status_code:403, msg:'用户未找到'})
    }
  })
})


/**
 * github用户绑定注册
 */
router.post('/signup/bind', function (req, res, next) {
  const email = req.fields.email
  const name = req.fields.name
  let password = req.fields.password
  const avatar = req.fields.avatar
  const github_id = req.fields.github_id

  if (req.fields.user_verify === 0 || req.fields.user_verify === 00) {
    // // 明文密码加密
    password = sha1(password) //sha1 并不是一种十分安全的加密方式，实际开发中可以使用更安全的 bcrypt 或 scrypt 加密。

    // // 待写入数据库的用户信息]
    let now = moment().format('YYYY-MM-DD HH:mm:ss')
    let user = {
      name: name,
      password: password,
      email: email,
      avatar: avatar,
      github_id: github_id,
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
        res.status(409).send({msg:'邮箱已注册, 请直接使用邮箱登录'})
      }
      next(e)
    })
  }
})














module.exports = router
