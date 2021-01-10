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
  }

}
