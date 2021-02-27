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

### 表关联查找
- 相关文档：https://www.cnblogs.com/duanxz/p/10838910.html

> $lookup:
db.product.insert({"_id":1,"productname":"商品1","price":15})
db.product.insert({"_id":2,"productname":"商品2","price":36})


db.orders.insert({"_id":1,"pid":1,"ordername":"订单1"})
db.orders.insert({"_id":2,"pid":2,"ordername":"订单2"})
db.orders.insert({"_id":3,"pid":2,"ordername":"订单3"})
db.orders.insert({"_id":4,"pid":1,"ordername":"订单4"})

db.product.find()
db.orders.find()

orders表里有product表的id

- 语法：
db.product.aggregate([
      {
        $lookup:
          {
           from: "orders",
           localField: "_id",
            foreignField: "pid",
           as: "inventory_docs"
          }
    }
 ])

- 结果
 1 /* 1 */
 2 {
 3     "_id" : 1.0,
 4     "productname" : "商品1",
 5     "price" : 15.0,
 6     "inventory_docs" : [ 
 7         {
 8             "_id" : 1.0,
 9             "pid" : 1.0,
10             "ordername" : "订单1"
11         }, 
12         {
13             "_id" : 4.0,
14             "pid" : 1.0,
15             "ordername" : "订单4"
16         }
17     ]
18 }
19 
20 /* 2 */
21 {
22     "_id" : 2.0,
23     "productname" : "商品2",
24     "price" : 36.0,
25     "inventory_docs" : [ 
26         {
27             "_id" : 2.0,
28             "pid" : 2.0,
29             "ordername" : "订单2"
30         }, 
31         {
32             "_id" : 3.0,
33             "pid" : 2.0,
34             "ordername" : "订单3"
35         }
36     ]
37 }



# 使用 brew 安装
此外你还可以使用 OSX 的 brew 来安装 mongodb：

brew tap mongodb/brew
brew install mongodb-community@4.4
@ 符号后面的 4.4 是最新版本号。

安装信息：

配置文件：/usr/local/etc/mongod.conf
日志文件路径：/usr/local/var/log/mongodb
数据存放路径：/usr/local/var/mongodb
运行 MongoDB
我们可以使用 brew 命令或 mongod 命令来启动服务。

brew 启动：

brew services start mongodb-community@4.4
or
brew services start mongodb/brew/mongodb-community
brew 停止：

brew services stop mongodb-community@4.4
or
brew services stop mongodb/brew/mongodb-community

mongod 命令后台进程方式：(手动)
mongod --config /usr/local/etc/mongod.conf --fork


mongod --config /usr/local/etc/mongod.conf --fork这种方式启动要关闭可以进入 mongo shell 控制台来实现：
> db.adminCommand({ "shutdown" : 1 })


# 下载mongodb compass GUI
官网下载