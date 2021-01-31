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
    <div style="background: #F0F6F9; width:100%; padding: 60px 0;">
      <div style="background: #FFFFFF; max-width: 600px; margin: auto;">
        <img style="width: 100%" src="https://github.com/Tarotify/taro-art-frontend/blob/master/src/asset/img/email-header.png?raw=true" />
        <div style="padding: 24px 60px 117px 60px; color: #471A66;; font-family: Inter; font-style: normal; font-weight: 500;font-size: 15px; line-height: 28px;">
        Hi,
        <br/>
        <br/>
        Your are register verify code is <b>${param}</b>.</br>
        </br>
        </br>
        Thanks,<br>
        Taro Team
        </div>
        <p style="font-family: Inter; font-style: normal; font-weight: bold; font-size: 18px;line-height: 22px;text-align: center;color: #471A66;">
          JOURNEY WITH TARO
        </p>
        <p style="margin:7px auto 25px; width:270px; color: rgba(71, 26, 102, 0.8); font-family: Inter;font-style: normal;font-weight: 500;font-size: 11px;line-height: 15px; text-align: center;">
          Sign up for email newsletters from TARO to receive updates on new events and promotional offers. You can unsubscribe at any time.
        </p>
        <p style="padding-bottom: 50px;font-family: Inter;font-style: normal;font-weight: 500;font-size: 11px;line-height: 13px;text-align: center; color: #471A66;">
          If you have any questions, please contact taro2020@gmail.com
        </p>
      </div>
    </div>
    `
    return temp
  },
  // <div style="padding: 76px 111px; background: #F0F6F9;">
  password_reset: function(param) {
    const temp =
    `
    <div style="background: #F0F6F9; width:100%; padding: 60px 0;">
      <div style="background: #FFFFFF; max-width: 600px; margin: auto;">
        <img style="width: 100%" src="https://github.com/Tarotify/taro-art-frontend/blob/master/src/asset/img/email-header.png?raw=true" />
        <div style="padding: 24px 60px 117px 60px; color: #471A66;; font-family: Inter; font-style: normal; font-weight: 500;font-size: 15px; line-height: 28px;">
        Hi,
        <br/>
        <br/>
        Your are reseting your account Password. Verify code is <b>${param}</b>.</br>
        If you are not doing this prompt, please ignore or contact us, and also reset your account password by yourself.
        </br>
        </br>
        Thanks,<br>
        Taro Team
        </div>
        <p style="font-family: Inter; font-style: normal; font-weight: bold; font-size: 18px;line-height: 22px;text-align: center;color: #471A66;">
          JOURNEY WITH TARO
        </p>
        <p style="margin:7px auto 25px; width:270px; color: rgba(71, 26, 102, 0.8); font-family: Inter;font-style: normal;font-weight: 500;font-size: 11px;line-height: 15px; text-align: center;">
          Sign up for email newsletters from TARO to receive updates on new events and promotional offers. You can unsubscribe at any time.
        </p>
        <p style="padding-bottom: 50px;font-family: Inter;font-style: normal;font-weight: 500;font-size: 11px;line-height: 13px;text-align: center; color: #471A66;">
          If you have any questions, please contact taro2020@gmail.com
        </p>
      </div>
    </div>
    `
    return temp
  }

}
