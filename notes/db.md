通过mongolass新建一个数据库对象
mongolass负责链接mongodb

操作数据库对象的model来进行创建对应的schema
```js
const User = mongolass.model('User', {
  name: { type: 'string' },
  phone: { type: 'number' }
})
```
