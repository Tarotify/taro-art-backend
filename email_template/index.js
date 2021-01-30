module.exports = {
  welcome: function (param) {
    const temp =
    `
      <img src="./images/email_header.png" />
      hi:<br/>

      <strong>Welcome to the family, you are one of us. We always on you.</strong>
    `
    return temp
  },
  signUp: function(param){
    const temp =
    `
      <img src="./images/email_header.png" />
      hi, your verfication code is ${param}.
    `
    return temp
  },
  password_reset: function(param) {
    const temp =
    `
      <div style="padding: 20px 35px; background: #ebebeb;">
      <img style="width: 100%" src="https://github.com/Tarotify/taro-art-frontend/blob/master/src/asset/img/taro_email_header.png?raw=true" />
      Hi:<br/>
      Your are reseting your account Password. Verify code is ${param}. If you are not doing this prompt, please ignore or contact us, and also reset your account password by yourself.</br>
      <br/>
      Thanks,
      Taro Team
      </div>
    `
    return temp
  }

}
