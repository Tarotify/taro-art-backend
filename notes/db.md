# mongolass 配置
通过mongolass新建一个数据库对象
mongolass负责链接mongodb

操作数据库对象的model来进行创建对应的schema
```js
const Mongolass = require('mongolass')

const mongolass = new Mongolass()
const User = mongolass.model('User', {
  name: { type: 'string' },
  phone: { type: 'number' }
})
```

在项目modle里引入数据库model

# mongodb
1. 安装Mongodb community server, 选择安装install Mongodb as a Server
2. 选择一起安装MongoDB Compass GUI
下载地址 ：https://www.mongodb.com/try/download/community?tck=docs_server
相关文章： https://zhuanlan.zhihu.com/p/98939669 

# mogodb CRUD
> https://docs.mongodb.com/manual/tutorial/insert-documents/
-  Equality Condition
```js
const cursor = db.collection('inventory').find({});
SELECT * FROM inventory
```
const cursor = db.collection('inventory').find({ status: 'D' });
SELECT * FROM inventory WHERE status = "D"


- Conditions Using Query Operators $in $or
const cursor = db.collection('inventory').find({
  status: { $in: ['A', 'D'] }
});
```sql
SELECT * FROM inventory WHERE status in ("A", "D")
```

-  AND Conditions $lt
```js
const cursor = db.collection('inventory').find({
  status: 'A',
  qty: { $lt: 30 }
});
```
```sql
SELECT * FROM inventory WHERE status = "A" AND qty < 30
```

- Specify AND as well as OR Conditions 
- $regex queries to perform string pattern matches. like
```js
const cursor = db.collection('inventory').find({
  status: 'A',
  $or: [{ qty: { $lt: 30 } }, { item: { $regex: '^p' } }]
});
```
```sql
SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")
```

- insert 
```js
db.users.insertOne(
  {
    name: 'raymond',
    email:'xxx',
    ....
  }
)

```
- update
```js
db.users.updateOne(
  {
    update-filter
  },
  {
    update-action
  }
)

db.users.updateOne(
  {
    name: 'raymond'
  },
  {
    $set:{status: 'admin'}
  }
)
```
