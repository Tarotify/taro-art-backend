# Node.js body parsing middleware.
> Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

1. 可以转换中文字符串的urlencoded
2. 可以转换json格式

ex:
```js
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies 
// 中文字符串
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies 
// JSON格式
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})
```
