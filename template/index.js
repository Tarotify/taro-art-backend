module.exports = {
  welcome: function (param) {
    const temp =
    `
      hi:<br/>
      <strong>Welcome to the family, you are one of us. We always on you.</strong>
    `
    return temp
  },
  signUp: function(param){
    const temp =
    `
      hi, your verfication code is ${param}.
    `
    return temp
  },
  password_reset: function(param) {
    const temp =
    `
      Hi:<br/>
      Your are reseting your account Password. Verify code is ${param}. If you are not doing this prompt, please ignore or contact us, and also reset your account password by yourself.</br>
      <br/>
      Thanks,
      Taro Team
    `
    return temp
  }

}
