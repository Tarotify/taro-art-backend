const User = require('../lib/mongo').User

// 对外暴露user创建方法
module.exports = {
  // 注册
  create: function create (user) {
    return User.insertOne(user).exec()
  },

  // 登录 通过email获取用户信息
  getUserByEmail: function getUserByEmail(email) {
    return User
      .findOne({email: email})
      .addCreatedAt() // 这里我们使用了 addCreatedAt 自定义插件（通过 _id 生成时间戳）
      .exec()
  },

   // 登录 通过email获取用户信息
  getUserByGithubId: function getUserByGithubId(github_id) {
    return User
      .findOne({github_id: github_id})
      .addCreatedAt() // 这里我们使用了 addCreatedAt 自定义插件（通过 _id 生成时间戳）
      .exec()
  },

  // 更新信息
  updateInfo: function updateUser(user, update_data) {
    return User
      .updateOne(
        {
          email: user
        },
        {
          $set:
            {
              name: update_data.name,
              password: update_data.password,
              age: update_data.age
            }
        }
      )
      .exec()
  },
  // 修改密码
  changePassword: function changePassword(user, password) {
    return User
      .updateOne(
        {
          email: user
        },
        {
          $set:
            {
              password,
            }
        }
      )
      .exec()
  }
}
