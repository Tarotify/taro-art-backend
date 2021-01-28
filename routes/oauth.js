const express = require('express')
const router = express.Router()
const axios = require('axios')
const globalVar = require('../utils/var')
const jwt = require('../utils/jwt')
const User = require('../models/User')


/**
 * @param user_verify  99 => user
 *                     0 =>  github_id
 *                     00 => github_id and email
 */


router.post('/github/codeAuth', async function(req, res, next){
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
        res.status(200).send({status_code:200, data:{user_verify: 00, name, avatar, email, github_id }})
    }else{
      // 用户信息生成token,返回前端存起来
      const token = new jwt(user).generateToken()
      res.status(200).send({status_code:200, data:{user_verify: 99, token}})
      }
    })
  }
})



module.exports = router
