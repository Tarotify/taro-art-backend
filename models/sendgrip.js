const sgMail = require('@sendgrid/mail')
const API_KEY = require('../utils/var').SENDGRID_API_KEY
const template = require('../email_template')

module.exports = function (send_to, title, template_name, param) {
  let html = template[template_name](param)
  sgMail.setApiKey(API_KEY)
  const msg = {
    to: send_to, // Change to your recipient
    from: 'life@raymondyao.info', // Change to your verified sender
    subject: title,
    text: 'thank you for your time!',
    html,
  }

  sgMail
    .send(msg)
    .then((res) => {
      console.log(`Email sent to ${msg.to}`)
      return true
    })
    .catch((error) => {
      console.error(error)
      return false
    })
}
