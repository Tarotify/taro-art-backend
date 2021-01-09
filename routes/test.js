const express = require('express')
const router = express.Router()
const sgMail = require('@sendgrid/mail')
const globalVar = require('../utils/var')

router.get('/mail', function (req, res) {
  // res.send('hello, ' + req.params.name)

  sgMail.setApiKey(globalVar.SENDGRID_API_KEY)
  const msg = {
    to: 'amychan1918@gmail.com', // Change to your recipient
    from: 'life@raymondyao.info', // Change to your verified sender
    subject: 'Taro takes art to another level',
    text: 'thank you for your time!',
    html: `
    hi:<br/>
    <strong>Welcome to the family, you are one of us. We always on you.</strong>
    `,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
      res.status(200).send(`已发测试邮件给${msg.to}`)
    })
    .catch((error) => {
      console.error(error)
    })
})


module.exports = router
