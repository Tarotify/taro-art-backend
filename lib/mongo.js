const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

const mongolass = new Mongolass()
mongolass.connect(config.mongodb)


// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm:ss')
    })
    return results
  },
  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm:ss')
    }
    return result
  }
})


exports.User = mongolass.model('User', {
  id: {type: 'number'},
  name: { type: 'string', required: true, default: 'learner' },
  email: { type: 'string', required: true },
  phone: { type: 'string' },
  avatar: { type: 'string'},
  age: {type: 'number', requied: true},
  password: {type: 'string', requied:true},
  github_id: {type: 'string'},
  create_date: {type:'string', requied:true},
})

exports.User.index({ email: 1 }, { unique: true }).exec()// 根据email找到用户，email全局唯一


// User
//   .insertOne({ name: 'raymond', phone: 'wrong age' })
//   .exec()
//   .then(console.log)
//   .catch(function (e) {
//     console.error(e)
//     console.error(e.stack)
//   })
/*
{ [Error: ($.age: "wrong age") ✖ (type: number)]
  validator: 'type',
  actual: 'wrong age',
  expected: { type: 'number' },
  path: '$.age',
  schema: 'UserSchema',
  model: 'User',
  plugin: 'MongolassSchema',
  type: 'beforeInsertOne',
  args: [] }
Error: ($.age: "wrong age") ✖ (type: number)
    at Model.insertOne (/Users/nswbmw/Desktop/mongolass-demo/node_modules/mongolass/lib/query.js:108:16)
    at Object.<anonymous> (/Users/nswbmw/Desktop/mongolass-demo/app.js:10:4)
    at Module._compile (module.js:409:26)
    at Object.Module._extensions..js (module.js:416:10)
    at Module.load (module.js:343:32)
    at Function.Module._load (module.js:300:12)
    at Function.Module.runMain (module.js:441:10)
    at startup (node.js:139:18)
    at node.js:974:3
 */
