# Mongodb

### NoSQL：一类新出现的数据库(not only sql)，它的特点：

- 不支持SQL语法
- 存储结构跟传统关系型数据库中的那种关系表完全不同，nosql中存储的数据都是KV形式
- NoSQL的世界中没有一种通用的语言，每种nosql数据库都有自己的api和语法，以及擅长的业务场景
- NoSQL中的产品种类相当多：
  - Mongodb
  - Redis
  - Hbase hadoop
  - Cassandra hadoop

### mongo的优势

•**易扩展**： NoSQL数据库种类繁多， 但是⼀个共同的特点都是去掉关系数据库的关系型特性。 数据之间⽆关系， 这样就⾮常容易扩展

•**⼤数据量**， **⾼性能**： NoSQL数据库都具有**⾮常⾼的读写性能**， 尤其在⼤数据量下， 同样表现优秀。 这得益于它的⽆关系性， 数据库的结构简单

•**灵活的数据模型**： NoSQL**⽆需事先**为要存储的**数据建⽴**字段， 随时可以存储⾃定义的数据格式。 ⽽在关系数据库⾥， 增删字段是⼀件⾮常麻烦的事情。 如果是⾮常⼤数据量的表， 增加字段简直就是⼀个噩梦

## mongodb的安装

### mac 安装

step:mac安装mongodb

> brew install mongodb

### linux 安装

>sudo apt-get install -y mongodb-org

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

## 配置

* mongodb的配置信息在/etc/mongod.conf下。

* 查看配置

  > sudo vi /etc/mongod.conf

* 端⼝，默认为27017

  > port 27017

* 查看帮助稳定

  > mongod –help

* 查看是否启动成功

  > ps ajx|grep mongod

## 服务器和客户端命令

#### 服务器端

启动：`sudo service mongod start`

停止：`sudo service mongod stop`

重启：`sudo service mongod restart`

#### 客户端

命令行交互: `mongo`

退出：`exit`或者`ctrl+c`

## 数据类型

数据类型分为

* Object ID： ⽂档ID
* String： 字符串， 最常⽤， 必须是有效的UTF-8
* Boolean： 存储⼀个布尔值， true或false
* Integer： 整数可以是32位或64位， 这取决于服务器
* Double： 存储浮点值
* Arrays： 数组或列表， 多个值存储到⼀个键
* Object： ⽤于嵌⼊式的⽂档， 即⼀个值为⼀个⽂档
* Null： 存储Null值
* Timestamp： 时间戳， 表示从1970-1-1到现在的总秒数
* Date： 存储当前⽇期或时间的UNIX时间格

创建⽇期

> 语句如下参数的格式为YYYY-MM-DD     new Date('2017-12-20')

objectID

* 每个⽂档都有⼀个属性， 为_id， 保证每个⽂档的唯⼀性

* 可以⾃⼰去设置_id插⼊⽂档，如果没有提供， 那么MongoDB为每个⽂档提供了⼀个独特的_id， 类型为objectID

* objectID是⼀个12字节的⼗六进制数：
  * 前4个字节为当前时间戳*
  * 接下来3个字节的机器ID
  * 接下来的2个字节中MongoDB的服务进程id
  * 最后3个字节是简单的增量值

## 数据库基础指令

* 查看当前的数据库

  > db

* 查看所有的数据库

  > show dbs  /show databases

* 切换数据库

  > use db_name

* 删除当前的数据库

  > db.dropDatabase()

* 查看数据库

  > db.stats()

* 查看数据库表 

  > db.system.users.stats()

* 查看集合

  > show collections

* 重命名集合

  > db.集合名称.renameCollection("name")

* 删除集合

  > db.集合名称.drop()

向不存在的集合中第⼀次加⼊数据时， 集合会被创建出来

* 手动创建集合

  > db.createCollection(name,options)  
  >
  > db.createCollection("sub",{ capped : true, size : 10 } )

## 数据库的增删改查

### 插入 insert

插⼊⽂档时， 如果不指定_id参数， MongoDB会为⽂档分配⼀个唯⼀的ObjectId

db.集合名称.insert(document)

```shell
> db.user.insert({name:"kastrcn",age:10}) #不指定_id参数
WriteResult({ "nInserted" : 1 })
> db.user.insert({_id:"2018",name:"kastrcn",age:10}) # 指定_id
WriteResult({ "nInserted" : 1 })
> db.user.find() # 查询记录
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "kastrcn", "age" : 10 }
{ "_id" : "2018", "name" : "kastrcn", "age" : 10 }
```

### 保存 save

db.集合名称.save(document)

如果⽂档的_id已经存在则修改， 如果⽂档的_id不存在则添加

```shell
> db.user.save({name:"kastrcn",age:10})   #保存记录
WriteResult({ "nInserted" : 1 })
> db.user.find()
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "kastrcn", "age" : 10 }
{ "_id" : "2018", "name" : "kastrcn", "age" : 10 }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : 10 }
> db.user.insert({_id:"2018",name:"kastrcn",age:10})  #指定_id保存记录
WriteResult({
	"nInserted" : 0,
	"writeError" : {
		"code" : 11000,
		"errmsg" : "E11000 duplicate key error collection: test1.user index: _id_ dup key: { : \"2018\" }"
	}
})
>
```

### 简单查询

db.集合名称.find()

```shell
> db.user.find() # 查询记录
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "kastrcn", "age" : 10 }
{ "_id" : "2018", "name" : "kastrcn", "age" : 10 }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : 10 }
```

### 更新

db.集合名称.update(<query> ,<update>,{multi: <boolean>})

> 参数query:查询条件

> 参数update:更新操作符

> 参数multi:可选， 默认是false，表示只更新找到的第⼀条记录， 值为true表示把满⾜条件的⽂档全部更新

如果不指定`$set`默认覆盖记录 注意："multi update only works with $ operators"

更新一条,覆盖更新db.user.update({name:"kastrcn"},{name:"user"})

```shell
> db.user.find() 
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "kastrcn", "age" : 10 }
{ "_id" : "2018", "name" : "kastrcn", "age" : 10 }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : 10 }
> db.user.update({name:"kastrcn"},{name:"user"}) #更新一条,覆盖更新
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.user.find()
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "user" }
{ "_id" : "2018", "name" : "kastrcn", "age" : 10 }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : 10 }
```

 更新一条,指定字段  db.user.update({name:"kastrcn"},{$set:{age:"18"}})

```shell
> db.user.find()
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "user" }
{ "_id" : "2018", "name" : "kastrcn", "age" : 10 }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : 10 }
> db.user.update({name:"kastrcn"},{$set:{age:"18"}})
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.user.find()
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "user" }
{ "_id" : "2018", "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : 10 }
```

更新全部 db.user.update({name:"kastrcn"},{$set:{age:"18"}},{multi:true})

```shell
> db.user.find()
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "user" }
{ "_id" : "2018", "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : 10 }
> db.user.update({name:"kastrcn"},{$set:{age:"18"}},{multi:true})
WriteResult({ "nMatched" : 2, "nUpserted" : 0, "nModified" : 1 })
> db.user.find()
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "user" }
{ "_id" : "2018", "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : "18" }
```

### 删除

db.集合名称.remove(<query>,{justOne: <boolean>})

>参数query:可选，删除的⽂档的条件

>参数justOne:可选， 如果设为true或1， 则只删除⼀条， 默认false， 表示删除多条

删除一条数据

```shell
> db.user.find()
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "user" }
{ "_id" : "2018", "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : "18" }
> db.user.remove({name:"kastrcn"},1)
WriteResult({ "nRemoved" : 1 })  #只删除一条
> db.user.find()
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "user" }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : "18" }
```

删除全部数据

```shell
> db.user.find()
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "user" }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : "18" }
> db.user.remove({})
WriteResult({ "nRemoved" : 2 })
> db.user.find()
```

## 数据库高级查询

### 数据查询

* ⽅法find()： 查询

  >  db.集合名称.find({条件⽂档})

 ```shell
> db.user.find()
{ "_id" : ObjectId("5c4d2c7e3277cf6b29d36645"), "name" : "user" }
{ "_id" : ObjectId("5c4d2cdf3277cf6b29d36646"), "name" : "kastrcn", "age" : "18" }
 ```

* ⽅法findOne()：查询，只返回第⼀个

  >   db.集合名称.findOne({条件⽂档})

```shell
> db.user.findOne()
{
	"_id" : ObjectId("5c4d32c33277cf6b29d36647"),
	"name" : "kastrcn",
	"age" : "18"
}
```

* ⽅法pretty()： 将结果格式化

  >   db.集合名称.find({条件⽂档}).pretty()

```shell
> db.user.find().pretty()
{
	"_id" : ObjectId("5c4d32c33277cf6b29d36647"),
	"name" : "kastrcn",
	"age" : "18"
}
{
	"_id" : ObjectId("5c4d32c43277cf6b29d36648"),
	"name" : "kastrcn",
	"age" : "18"
}
```

### ⽐较运算符

* 等于： 默认是等于判断， 没有运算符

* ⼩于：$lt （less than）

* ⼩于等于：$lte （less than equal）

* ⼤于：$gt （greater than）

* ⼤于等于：$gte

* 不等于：$ne

```shell
> db.user.find({name:{$gte:"kastrcn"}})
{ "_id" : ObjectId("5c4d32c33277cf6b29d36647"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36648"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36649"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664a"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664b"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664c"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664d"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664e"), "name" : "kastrcn", "age" : "18" }
```

### 逻辑运算符

* and：在json中写多个条件即可
* or:使⽤$or， 值为数组， 数组中每个元素为json

and

```shell
> db.user.find({name:{$gte:"kastrcn"},age:"18"})
{ "_id" : ObjectId("5c4d32c33277cf6b29d36647"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36648"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36649"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664a"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664b"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664c"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664d"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664e"), "name" : "kastrcn", "age" : "18" }
```

or

```shell
> db.user.find({$or:[{name:"kastrcn"},{age:10}]})
{ "_id" : ObjectId("5c4d32c33277cf6b29d36647"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36648"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36649"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664a"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664b"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664c"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664d"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664e"), "name" : "kastrcn", "age" : "18" }
```

### 范围运算符

使⽤"$in"， "$nin" 判断是否在某个范围内

```shell
> db.user.find({age:{$nin:[18,"18",10]}})
> db.user.find({age:{$in:[18,"18",10]}})
{ "_id" : ObjectId("5c4d32c33277cf6b29d36647"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36648"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36649"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664a"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664b"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664c"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664d"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664e"), "name" : "kastrcn", "age" : "18" }
```

### ⽀持正则表达式

使⽤//或$regex编写正则表达式

```shell
> db.user.find({name:/^k/})
{ "_id" : ObjectId("5c4d32c33277cf6b29d36647"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36648"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36649"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664a"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664b"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664c"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664d"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664e"), "name" : "kastrcn", "age" : "18" }
> db.user.find({name:{$regex:/^k/}})
{ "_id" : ObjectId("5c4d32c33277cf6b29d36647"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36648"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36649"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664a"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664b"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664c"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664d"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664e"), "name" : "kastrcn", "age" : "18" }
```

### limit和skip

* ⽅法limit()： ⽤于读取指定数量的⽂档

  >  db.集合名称.find().limit(NUMBER)

* ⽅法skip()： ⽤于跳过指定数量的⽂档

  > db.集合名称.find().skip(NUMBER)

```shell
> db.user.find().skip(6).limit(2) #跳过前6个 取2个
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664d"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664e"), "name" : "kastrcn", "age" : "18" }
```

### ⾃定义查询*

使⽤$where后⾯写⼀个函数， 返回满⾜条件的数据

```shell
> db.user.find({$where:function(){ return this.age>"17"}})
{ "_id" : ObjectId("5c4d32c33277cf6b29d36647"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36648"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36649"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664a"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664b"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664c"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664d"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664e"), "name" : "kastrcn", "age" : "18" }
```

### 投影

在查询到的返回结果中， 只选择必要的字段

db.集合名称.find({},{字段名称:1,...})

参数为字段与值， 值为1表示显示， 值为0不显

特殊： 对于_id列默认是显示的， 如果不显示需要明确设置为0

```shell
> db.user.find({},{name:1})
{ "_id" : ObjectId("5c4d32c33277cf6b29d36647"), "name" : "kastrcn" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36648"), "name" : "kastrcn" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36649"), "name" : "kastrcn" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664a"), "name" : "kastrcn" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664b"), "name" : "kastrcn" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664c"), "name" : "kastrcn" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664d"), "name" : "kastrcn" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664e"), "name" : "kastrcn" }
> db.user.find({},{_id:0})
{ "name" : "kastrcn", "age" : "18" }
{ "name" : "kastrcn", "age" : "18" }
{ "name" : "kastrcn", "age" : "18" }
{ "name" : "kastrcn", "age" : "18" }
{ "name" : "kastrcn", "age" : "18" }
{ "name" : "kastrcn", "age" : "18" }
{ "name" : "kastrcn", "age" : "18" }
{ "name" : "kastrcn", "age" : "18" }
```

### 排序

⽅法sort()， ⽤于对  集进⾏排序

db.集合名称.find().sort({字段:1,...})

参数1为升序排列

参数-1为降序排列

db.stu.find().sort({gender:-1,age:1})

```shell
> db.user.find().sort({_id:-1})
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664e"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c63277cf6b29d3664d"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664c"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664b"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c53277cf6b29d3664a"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36649"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c43277cf6b29d36648"), "name" : "kastrcn", "age" : "18" }
{ "_id" : ObjectId("5c4d32c33277cf6b29d36647"), "name" : "kastrcn", "age" : "18" }
```

### 统计个数

⽅法count()⽤于统计结果集中⽂档条数

db.集合名称.find({条件}).count()

db.集合名称.count({条件})

```shell
> db.user.find().count()
8
> db.user.count()
8
```

### 消除重复

⽅法distinct()对数据进⾏去重

db.集合名称.distinct('去重字段',{条件})

```shell
> db.user.distinct('name')
[ "kastrcn" ]
```

## 管道聚合

### 聚合 aggregate

聚合(aggregate)是基于数据处理的聚合管道，每个文档通过一个由多个阶段（stage）组成的管道，可以对每个阶段的管道进行分组、过滤等功能，然后经过一系列的处理，输出相应的结果。 

db.集合名称.aggregate({管道:{表达式}})

### 常⽤管道

在mongodb中，⽂档处理完毕后， 通过管道进⾏下⼀次处理

常用管道如下：

$group： 将集合中的⽂档分组， 可⽤于统计结果

$match： 过滤数据， 只输出符合条件的⽂档

$project： 修改输⼊⽂档的结构， 如重命名、 增加、 删除字段、 创建计算结果

$sort： 将输⼊⽂档排序后输出

$limit： 限制聚合管道返回的⽂档数

$skip： 跳过指定数量的⽂档， 并返回余下的⽂档

$unwind： 将数组类型的字段进⾏拆分

### 表达式

处理输⼊⽂档并输出

语法：表达式:'$列名'

常⽤表达式:

$sum： 计算总和， $sum:1 表示以⼀倍计数

$avg： 计算平均值

$min： 获取最⼩值

$max： 获取最⼤值

$push： 在结果⽂档中插⼊值到⼀个数组中

$first： 根据资源⽂档的排序获取第⼀个⽂档数据

$last： 根据资源⽂档的排序获取最后⼀个⽂档数据

#### $group

将集合中的文档分组

根据name 分组计数

```shell
> db.user.aggregate(
... {$group:
... {
...             _id:'name',
...             counter:{$sum:1}
... }
...
... }
... )
{ "_id" : "name", "counter" : 100000 }
```



group文档：https://docs.mongodb.com/manual/reference/operator/aggregation/group/

#### Group by null

```shell
> db.user.aggregate(
... {$group:
... {
...             _id:null,
...             counter:{$sum:1}
... }
...
... }
... )
{ "_id" : null, "counter" : 100000 }
```

#### 透视试图

$$root 引用当前正在聚合管道阶段处理的根文档，即顶级文档。

```shell
> db.user.aggregate(
... {$limit:2},
... {
...   $group:
... {
...             _id:null,
...             counter:{$push:'$$ROOT'}
... }
...
... }
... )
{ "_id" : null, "counter" : [ { "_id" : ObjectId("5c4d420d3277cf6b29d3664f"), "name" : "test0", "age" : 0 }, { "_id" : ObjectId("5c4d420d3277cf6b29d36650"), "name" : "test1", "age" : 1 } ] }
```

#### $match 

```shell
> db.user.aggregate(
... {$match:{name:"test8888"}}
... )
{ "_id" : ObjectId("5c4d420f3277cf6b29d38907"), "name" : "test8888", "age" : 8888 }
```

#### $project

```shell
> db.user.aggregate( {$project:{name:1}} )
{ "_id" : ObjectId("5c4d420d3277cf6b29d3664f"), "name" : "test0" }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36650"), "name" : "test1" }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36651"), "name" : "test2" }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36652"), "name" : "test3" }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36653"), "name" : "test4" }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36654"), "name" : "test5" }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36655"), "name" : "test6" }
```

#### $sort

```shell
> db.user.aggregate(
... {$sort:{age:1}}
... )
{ "_id" : ObjectId("5c4d420d3277cf6b29d3664f"), "name" : "test0", "age" : 0 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36650"), "name" : "test1", "age" : 1 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36651"), "name" : "test2", "age" : 2 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36652"), "name" : "test3", "age" : 3 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36653"), "name" : "test4", "age" : 4 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36654"), "name" : "test5", "age" : 5 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36655"), "name" : "test6", "age" : 6 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36656"), "name" : "test7", "age" : 7 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36657"), "name" : "test8", "age" : 8 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36658"), "name" : "test9", "age" : 9 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36659"), "name" : "test10", "age" : 10 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d3665a"), "name" : "test11", "age" : 11 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d3665b"), "name" : "test12", "age" : 12 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d3665c"), "name" : "test13", "age" : 13 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d3665d"), "name" : "test14", "age" : 14 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d3665e"), "name" : "test15", "age" : 15 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d3665f"), "name" : "test16", "age" : 16 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36660"), "name" : "test17", "age" : 17 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36661"), "name" : "test18", "age" : 18 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d36662"), "name" : "test19", "age" : 19 }
Type "it" for more
```

#### $limit和$skip

```shell
> db.user.aggregate(
... {$skip:10},
... {$limit:4}
... )
{ "_id" : ObjectId("5c4d420d3277cf6b29d36659"), "name" : "test10", "age" : 10 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d3665a"), "name" : "test11", "age" : 11 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d3665b"), "name" : "test12", "age" : 12 }
{ "_id" : ObjectId("5c4d420d3277cf6b29d3665c"), "name" : "test13", "age" : 13 }
```

#### $unwind

将⽂档中的某⼀个数组类型字段拆分成多条， 每条包含数组中的⼀个值

```shell
> db.t2.insert({_id:1,item:'t-shirt',size:['S','M','L']})
WriteResult({ "nInserted" : 1 })
> db.t2.aggregate({$unwind:'$size'})
{ "_id" : 1, "item" : "t-shirt", "size" : "S" }
{ "_id" : 1, "item" : "t-shirt", "size" : "M" }
{ "_id" : 1, "item" : "t-shirt", "size" : "L" }
```

## 索引

索引：以提升查询速度

* 创建索引

  > 语法：db.集合.ensureIndex({属性:1})，1表示升序， -1表示降序
  >
  > db.t1.ensureIndex({name:1})

* 在默认情况下创建的索引均不是唯一索引。

- 创建唯一索引:

  > db.user.ensureIndex({"name":1},{"unique":true})

- 创建唯一索引并消除重复：

  > db.user.ensureIndex({"name":1},{"unique":true,"dropDups":true})  

- 建立联合索引(什么时候需要联合索引)：

  >   db.user.ensureIndex({name:1,age:1})

- 查看当前集合的所有索引：

  >   db.user.getIndexes()

- 删除索引：

  >   db.user.dropIndex('索引名称')

### 建立索引之后对比

```shell
# 测试：插入10万条数据到数据库中
for(i=0;i<100000;i++){db.t12.insert({name:'test'+i,age:i})}
# 查询
db.user.find({name:'test10000'}).explain('executionStats')
# 创建索引
db.user.ensureIndex({name:1})
# 查询索引
db.user.getIndexes()
# 查询
db.user.find({name:'test10000'}).explain('executionStats')
```

## 备份恢复

### 备份的语法

mongodump -h dbhost -d dbname -o dbdirectory

-h： 服务器地址， 也可以指定端⼝号

-d： 需要备份的数据库名称

-o： 备份的数据存放位置， 此⽬录中存放着备份出来的数据

`mongodump -h 192.168.196.128:27017 -d test1 -o ~/Desktop/test1bak`

### 恢复语法

mongorestore -h dbhost -d dbname --dir dbdirectory

-h： 服务器地址

-d： 需要恢复的数据库实例

--dir： 备份数据所在位置

`mongorestore -h 192.168.196.128:27017 -d test2 --dir ~/Desktop/test1bak/test1`

## python交互

```python
# coding=utf-8
from pymongo import MongoClient

#实例化client，建立连接
client = MongoClient(host="127.0.0.1",port=27017)
collection = client["test"]["t251"]

#插入一条数据
# ret1 = collection.insert({"name":"xiaowang","age":10})
# print(ret1)

#插入多条数据
# data_list = [{"name":"test{}".format(i)} for i in range(10)]
# collection.insert_many(data_list)

#查询一个记录
# t = collection.find_one({"name":"xiaowang"})
# print(t)
#查询所有记录
t = collection.find({"name":"xiaowang"})
print(t)

# for i in t:
#     print(i)
#
# for j in t:
#     print(j,"*"*100)
print(list(t))
```