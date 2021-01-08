const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')

const mongolass = new Mongolass()
mongolass.connect(config.mongodb)

const User = mongolass.model('User', {
  name: { type: 'string' },
  phone: { type: 'number' }
})

User
  .insertOne({ name: 'raymond', phone: 'wrong age' })
  .exec()
  .then(console.log)
  .catch(function (e) {
    console.error(e)
    console.error(e.stack)
  })
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
