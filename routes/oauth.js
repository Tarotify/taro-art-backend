const express = require('express')
const router = express.Router()
const axios = require('axios')
const globalVar = require('../utils/var')
const jwt = require('../utils/jwt')
const User = require('../models/User')
const sha1 = require('sha1')
const moment = require('moment')

/**
 * @param user_verify  99 => user
 *                     0 =>  github_id
 *                     00 => github_id and email
 */


router.post('/github/codeAuth', async function(req, res, next) {
  const requestToken = req.fields.code
  console.log(requestToken)

  const tokenResponse = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${globalVar.github_client_id}&` +
      `client_secret=${globalVar.github_client_secret}&` +
      `code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  });

  const accessToken = tokenResponse.data.access_token;

  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  });
  // // const name = result.data.name;
  // // ctx.response.redirect(`/welcome.html?name=${name}`);
  const github_id = result.data.id
  let name = result.data.name
  const displayName = result.data.login
  const avatar = result.data.avatar_url
  const email = result.data.email
  // 若github用户没有名字，用昵称代替
  if (name === null) {
    name = displayName
  }
  // 没有邮箱，用github_id看看有没记录
  if(email === null) {
    User.getUserByGithubId(github_id).then((user) => {
      if(!user) {
        console.log(user)
        res.status(200).send({status_code:200, data:{user_verify: 0, name, avatar, github_id }})
    }else{
      // 用户信息生成token,返回前端存起来
      const token = new jwt(user).generateToken()
      res.status(200).send({status_code:200, data:{user_verify: 99, token}})
      }
    })
  }
  // 有邮箱 查看是否有账号
  if (email !== null ) {
    User.getUserByEmail(email).then((user) => {
      if(!user) {
        res.status(200).send({status_code:200, data:{user_verify: 0, name, avatar, email, github_id }})
    }else{
      // 用户信息生成token,返回前端存起来
      const token = new jwt(user).generateToken()
      res.status(200).send({status_code:200, data:{user_verify: 99, token}})
      }
    })
  }
})


/**
 * @param user_verify  99 => user => 自动login
 *                     0 =>  email, not user => 自动register
 */

router.post('/google/tokenAuth', async function(req, res,next) {
  const requestToken = req.fields.token
  console.log(requestToken)
  if (!requestToken){
    res.status(200).send({status_code:403, msg:'google request token is required'})
  }
  const result = await axios({
    method: 'get',
    url:`https://oauth2.googleapis.com/tokeninfo?id_token=${requestToken}`,
  })

  console.log(result)
  if(!result.data.email_verified) {
    res.status(200).send({status_code:401, msg:'google token verify failed'})
  }
  const name = result.data.name
  const avatar = result.data.picture
  const email = result.data.email
  let now = moment().format('YYYY-MM-DD HH:mm:ss')

  User.getUserByEmail(email).then((user) => {
    if(!user) {
      // 注册账号
      let newUser = {
        name,
        password: sha1('taro5201314'),
        email,
        avatar,
        create_date: now
      }
      UserModel.create(newUser)
      .then((result) => {
        // 此 new_User 是插入 mongodb 后的值，包含 _id
        let new_user = result.ops[0]

        // 删除密码这种敏感信息，将用户信息存入 session （新方法，不存session 用token)
        delete new_user.password
        // req.session.user = new_user 原本是使用set-cookies返回给前端的SESSION

        // 用注册信息生成token
        let token = new jwt(new_user).generateToken()
        res.status(200).send({status_code:200, data:{user_verify: 0, token}})
      }).catch((e) => {
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
    }else{
      // 已经注册过了
      // 用户信息生成token,返回前端存起来
      const token = new jwt(user).generateToken()
      res.status(200).send({status_code:200, data:{user_verify: 99, token}})
    }
  })
  // .then(result => {
  //   console.log(res)
  //   res.
  // }).catch(err => {
  //   res.status(200).send({status_code:404, msg:'google account info request failed'})
  // })
})

module.exports = router
