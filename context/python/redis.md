# 安装

mac 安装

`brew install redis`

- redis-server redis服务器
- redis-cli redis命令行客户端
- redis-benchmark redis性能测试工具
- redis-check-aof AOF文件修复工具
- redis-check-rdb RDB文件检索工具

# 配置

* 查看

  >  vi /usr/local/etc/redis.conf # mac
  >
  > sudo vi /etc/redis/redis.conf #linux

## 配置选项

- 绑定ip：如果需要远程访问，可将此⾏注释，或绑定⼀个真实ip

  > bind 127.0.0.1

- 端⼝，默认为6379

  > port 6379

- 是否以守护进程运⾏

  - 如果以守护进程运⾏，则不会在命令⾏阻塞，类似于服务
  - 如果以⾮守护进程运⾏，则当前终端被阻塞
  - 设置为yes表示守护进程，设置为no表示⾮守护进程
  - 推荐设置为yes

  > daemonize yes

- 数据⽂件

  > dbfilename dump.rdb

- 数据⽂件存储路径

  > dir /var/lib/redis

- ⽇志⽂件

  > logfile /var/log/redis/redis-server.log

- 数据库，默认有16个

  > database 16

- 主从复制，类似于双机备份。

  > slaveof

## 参考资料

 redis配置信息<http://blog.csdn.net/ljphilp/article/details/52934933>

# 服务端客户端

## 客户端

* 可以使⽤help查看帮助⽂档

  > redis-cli —help

* 连接redis

  > redis-cli

* 运行测试命令

  > ping

* 切换数据库

  数据库没有名称，默认有16个，通过0-15来标识，连接redis默认选择第一个数据库

  > select n

## 服务端

* 可以使⽤help查看帮助⽂档

  > redis-server --help

* 启动

  > sudo service redis start
  >
  > 或
  >
  > sudo redis-server /etc/redis/redis.conf 指定加载的配置文件

* 停止

  > sudo service redis stop

  或

  > ps -ef|grep redis 查看redis服务器进程
  > sudo kill -9 pid 杀死redis服务器

* 重启

  > sudo service redis restart

# 数据操作

- 字符串string
- 哈希hash
- 列表list
- 集合set
- 有序集合zset

## string

  字符串类型是Redis中最为基础的数据存储类型，它在Redis中是二进制安全的，这便意味着该类型可以接受任何格式的数据，如JPEG图像数据或Json对象描述信息等。在Redis中字符串类型的Value最多可以容纳的数据长度是512M。

### 添加

* 设置键值

  > set key value

* 设置键值及过期时间，以秒为单位

  > setex key seconds value

* 设置多个键值

  > mset key1 value1 key2 value2 ...

* 追加值

  > append key value

### 查询

* 获取

  > get key

* 根据多个键获取多个值

  > mget key1 key2 ...

### 删除

* 删除

  > del key

### 修改

* 修改

  > set key value

```shell
127.0.0.1:6379> set name kastrcn
OK
127.0.0.1:6379> setex age 300 value
OK
127.0.0.1:6379> mset user admin password pwd
OK
127.0.0.1:6379> keys *
1) "user"
2) "age"
3) "name"
4) "password"
127.0.0.1:6379> get user
"admin"
127.0.0.1:6379> get name
"kastrcn"
127.0.0.1:6379> ttl age
(integer) 190
127.0.0.1:6379> append user istrator
(integer) 13
127.0.0.1:6379> get user
"administrator"
127.0.0.1:6379> mget user password
1) "administrator"
2) "pwd"
```

## hash

- hash⽤于存储对象，对象的结构为属性、值
- 值的类型为string

### 添加

* 设置单个属性

  > hset key field value

#### error

MISCONF Redis is configured to save RDB snapshots, but is currently not able to persist on disk. Commands that may modify the data set are disabled. Please check Redis logs for details about the error.

Redis被配置为保存数据库快照，但它目前不能持久化到硬盘。用来修改集合数据的命令不能用

原因：

- 强制关闭Redis快照导致不能持久化。 解决方案：

- 运行config set stop-writes-on-bgsave-error no　命令后，关闭配置项stop-writes-on-bgsave-error解决该问题。

- 设置多个属性

  > hmset key field1 value1 field2 value2 ...

- 例2：设置键u2的属性name为itcast、属性age为11

  > hmset u2 name itcast age 11

### 查询

* 获取指定键所有的属性

  > hkeys key

* 获取⼀个属性的值

  > hget key field

* 获取多个属性的值

  > hmget key field1 field2 ...

* 获取所有属性的值

  > hvals key

### 删除

- 删除整个hash键及值，使⽤del命令

- 删除属性，属性对应的值会被⼀起删除

  > hdel key field1 field2 ...

### 修改

* 覆盖

```shell
127.0.0.1:6379> hset  person name admin
(integer) 1
127.0.0.1:6379> hkeys name
(empty list or set)
127.0.0.1:6379> hkeys person
1) "name"
127.0.0.1:6379> hget person name
"admin"
127.0.0.1:6379> hmset user name kastrcn age 18
OK
127.0.0.1:6379> hmget user name age
1) "kastrcn"
2) "18"
127.0.0.1:6379> hvals user
1) "kastrcn"
2) "18"
127.0.0.1:6379> hdel user age
(integer) 1
127.0.0.1:6379> hvals user
1) "kastrcn"
```



## list

- 列表的元素类型为string
- 按照插⼊顺序排序

### 添加

* 在左侧插⼊数据

  > lpush key value1 value2 ...

* 在右侧插⼊数据

  > rpush key value1 value2 ...

* 在指定元素的前或后插⼊新元素

  > linsert key before或after 现有元素 新元素

### 查询

* 返回列表⾥指定范围内的元素
  * start、stop为元素的下标索引
  * 索引从左侧开始，第⼀个元素为0
  * 索引可以是负数，表示从尾部开始计数，如-1表示最后⼀个元素

  > lrange key start stop

### 删除

* 删除指定元素
  - 将列表中前count次出现的值为value的元素移除
  - count > 0: 从头往尾移除
  - count < 0: 从尾往头移除
  - count = 0: 移除所有

### 修改

#### 设置指定索引位置的元素值

- 索引从左侧开始，第⼀个元素为0

- 索引可以是负数，表示尾部开始计数，如-1表示最后⼀个元素

  > lset key index value

```shell
127.0.0.1:6379> rpush list d e f
(integer) 3
127.0.0.1:6379> lrange list 0 -1
1) "d"
2) "e"
3) "f"
127.0.0.1:6379> lpush list c b b
(integer) 6
127.0.0.1:6379> lrange list 0 -1
1) "b"
2) "b"
3) "c"
4) "d"
5) "e"
6) "f"
127.0.0.1:6379> lrange list 0 -1
1) "b"
2) "b"
3) "c"
4) "d"
5) "e"
6) "f"
127.0.0.1:6379> lset list 0 a
OK
127.0.0.1:6379> lrange list 0 -1
1) "a"
2) "b"
3) "c"
4) "d"
5) "e"
6) "f"
127.0.0.1:6379> lrem list 1 c
(integer) 1
127.0.0.1:6379> lrange list 0 -1
1) "a"
2) "b"
3) "d"
4) "e"
5) "f"
127.0.0.1:6379> linsert list before b c
(integer) 6
127.0.0.1:6379> lrange list 0 -1
1) "a"
2) "c"
3) "b"
4) "d"
5) "e"
6) "f"
```

## set

- ⽆序集合
- 元素为string类型
- 元素具有唯⼀性，不重复
- 说明：对于集合没有修改操作

### 添加

* 添加元素

  > sadd key member1 member2 ...

### 查询

* 返回所有的元素

  > smembers key

### 删除

* 删除指定元素

  > srem key

```shell
127.0.0.1:6379> sadd set a b c d
(integer) 4
127.0.0.1:6379> smembers set
1) "d"
2) "b"
3) "c"
4) "a"
127.0.0.1:6379> srem set c
(integer) 1
127.0.0.1:6379> smembers set
1) "d"
2) "b"
3) "a"
```

## zset

- sorted set，有序集合
- 元素为string类型
- 元素具有唯⼀性，不重复
- 每个元素都会关联⼀个double类型的score，表示权重，通过权重将元素从⼩到⼤排序
- 说明：没有修改操作

### 添加

* 添加

  > zadd key score1 member1 score2 member2 ...

### 查询

- 返回指定范围内的元素

- start、stop为元素的下标索引

- 索引从左侧开始，第⼀个元素为0

- 索引可以是负数，表示从尾部开始计数，如-1表示最后⼀个元素

  > zrange key start stop

- 返回score值在min和max之间的成员

  > zrangebyscore key min max

- 返回成员member的score值

  > zscore key member

### 删除

* 删除指定元素

  > zrem key member1 member2 ...

* 删除权重在指定范围的元素

  > zremrangebyscore key min max

```shell
127.0.0.1:6379> zadd zset 1 a 2 b 3 c
(integer) 3
127.0.0.1:6379> zrange zset 0 -1
1) "a"
2) "b"
3) "c"
127.0.0.1:6379> zrangebyscore zset 2 3
1) "b"
2) "c"
127.0.0.1:6379> zscore zset a
"1"
127.0.0.1:6379> zrem zset b
(integer) 1
127.0.0.1:6379> zrange zset 0 -1
1) "a"
2) "c"
127.0.0.1:6379> zremrangebyscore zset 2 3
(integer) 1
127.0.0.1:6379> zrange zset 0 -1
1) "a"
```

## 杂项

### 键命令

* 查找键，参数⽀持正则表达式

  > keys pattern

* 查看所有键

  > keys *

* 判断键是否存在，如果存在返回1，不存在返回0

  > exists key1

* 查看键对应的value的类型

  > type key

* 删除键及对应的值

  > del key1 key2 ...

* 设置过期时间，以秒为单位

* 如果没有指定过期时间则⼀直存在，直到使⽤DEL移除

   > expire key seconds

* 查看有效时间，以秒为单位

  > ttl key	

* 删除当前数据库中的所有Key

  > flushdb

* 删除所有数据库中的key

  > flushall

* 如果要指定 Redis 数据库访问密码，使用下面的命令

  > redis-cli -a password keys "*" | xargs redis-cli -a password del

# python交互

## python基础

- 在桌面上创建redis目录
- 使用pycharm打开 redis目录
- 创建redis_string.py文件

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()

    except Exception as e:
        print(e)
```

### string-增加

- ⽅法set，添加键、值，如果添加成功则返回True，如果添加失败则返回False
- 编写代码如下

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()
        #添加键name，值为itheima
        result=sr.set('name','itheima')
        #输出响应结果，如果添加成功则返回True，否则返回False
        print(result)
    except Exception as e:
        print(e)
```

### string-获取

- ⽅法get，添加键对应的值，如果键存在则返回对应的值，如果键不存在则返回None
- 编写代码如下

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()
        #获取键name的值
        result = sr.get('name')
        #输出键的值，如果键不存在则返回None
        print(result)
    except Exception as e:
        print(e)
```

### string-修改

- ⽅法set，如果键已经存在则进⾏修改，如果键不存在则进⾏添加
- 编写代码如下

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()
        #设置键name的值，如果键已经存在则进⾏修改，如果键不存在则进⾏添加
        result = sr.set('name','itcast')
        #输出响应结果，如果操作成功则返回True，否则返回False
        print(result)
    except Exception as e:
        print(e)
```

### string-删除

- ⽅法delete，删除键及对应的值，如果删除成功则返回受影响的键数，否则则返 回0
- 编写代码如下

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()
        #设置键name的值，如果键已经存在则进⾏修改，如果键不存在则进⾏添加
        result = sr.delete('name')
        #输出响应结果，如果删除成功则返回受影响的键数，否则则返回0
        print(result)
    except Exception as e:
        print(e)
```

### 获取键

- ⽅法keys，根据正则表达式获取键
- 编写代码如下

```python
from redis import *
if __name__=="__main__":
    try:
        #创建StrictRedis对象，与redis服务器建⽴连接
        sr=StrictRedis()
        #获取所有的键
        result=sr.keys()
        #输出响应结果，所有的键构成⼀个列表，如果没有键则返回空列表
        print(result)
    except Exception as e:
        print(e)
```

## django存储session

- 创建test5项目和booktest应用
- 配置url

### session的redis存储配置

- 安装包

  > pip install django-redis-sessions==0.5.6

- 修改settings文件，增加如下项

  > SESSION_ENGINE = 'redis_sessions.session'
  > SESSION_REDIS_HOST = 'localhost'
  > SESSION_REDIS_PORT = 6379
  > SESSION_REDIS_DB = 2
  > SESSION_REDIS_PASSWORD = ''
  > SESSION_REDIS_PREFIX = 'session'

### 测试

- 打开booktest/views.py文件，创建session_set和session_get视图如下

```python
  def session_set(request):
      request.session['name']='itheima'
      return HttpResponse('ok')


  def session_get(request):
      name=request.session['name']
      return HttpResponse(name)
```

- 打开booktest/urls.py文件，配置url如下

```
  url(r'^session_set/$',views.session_set),
  url(r'^session_get/$', views.session_get),
```

- 通过redis-cli客户端查看
- Base64在线解码<http://base64.xpcha.com/> 

# 主从复制

## 主从概念

- ⼀个master可以拥有多个slave，⼀个slave⼜可以拥有多个slave，如此下去，形成了强⼤的多级服务器集群架构
- master用来写数据，slave用来读数据，经统计：网站的读写比率是10:1
- 通过主从配置可以实现读写分离

- master和slave都是一个redis实例(redis服务)

## 主从配置

### 配置主

* 查看当前主机的ip地址

* 修改etc/redis/redis.conf文件

  > sudo vi redis.conf
  > bind 192.168.26.128

* 重启redis服务

  > sudo service redis stop
  > redis-server redis.conf

### 配置从

* 复制etc/redis/redis.conf文件

  > sudo cp redis.conf ./slave.conf

* 修改redis/slave.conf文件

  > sudo vi slave.conf

* 编辑内容

  > bind 192.168.26.128
  > slaveof 192.168.26.128 6379
  > port 6378

* redis服务

  > sudo redis-server slave.conf

* 查看主从关系

  > redis-cli -h 192.168.26.128 info Replication

### 数据操作

- 在master和slave分别执⾏info命令，查看输出信息 进入主客户端

  > redis-cli -h 192.168.26.128 -p 6379

- 进入从的客户端

  > redis-cli -h 192.168.26.128 -p 6378

- 在master上写数据

  > set aa aa

- 在slave上读数据

  > get aa

# 搭建集群

## 为什么要有集群

- 之前我们已经讲了主从的概念，一主可以多从，如果同时的访问量过大(1000w),主服务肯定就会挂掉，数据服务就挂掉了或者发生自然灾难

## 集群的概念

- 集群是一组相互独立的、通过高速网络互联的计算机，它们构成了一个组，并以单一系统的模式加以管理。一个客户与集群相互作用时，集群像是一个独立的服务器。集群配置是用于提高可用性和可缩放性。

## 搭建集群

### 配置机器1

- 在演示中，172.16.179.130为当前ubuntu机器的ip

- 在172.16.179.130上进⼊Desktop⽬录，创建conf⽬录

- 在conf⽬录下创建⽂件7000.conf，编辑内容如下

  ```
  port 7000
  bind 172.16.179.130
  daemonize yes
  pidfile 7000.pid
  cluster-enabled yes
  cluster-config-file 7000_node.conf
  cluster-node-timeout 15000
  appendonly yes
  ```

- 在conf⽬录下创建⽂件7001.conf，编辑内容如下

  ```
  port 7001
  bind 172.16.179.130
  daemonize yes
  pidfile 7001.pid
  cluster-enabled yes
  cluster-config-file 7001_node.conf
  cluster-node-timeout 15000
  appendonly yes
  ```

* 在conf⽬录下创建⽂件7002.conf，编辑内容如下

  ```
  port 7002
  bind 172.16.179.130
  daemonize yes
  pidfile 7002.pid
  cluster-enabled yes
  cluster-config-file 7002_node.conf
  cluster-node-timeout 15000
  appendonly yes
  ```

* 配置区别在port、pidfile、cluster-config-file三项

* 使⽤配置⽂件启动redis服务 

  ```
  redis-server 7000.conf
  redis-server 7001.conf
  redis-server 7002.conf
  ```

### 配置机器2

- 在演示中，172.16.179.131为当前ubuntu机器的ip

- 在172.16.179.131上进⼊Desktop⽬录，创建conf⽬录

- 在conf⽬录下创建⽂件7003.conf，编辑内容如下

  ```
  port 7003
  bind 172.16.179.131
  daemonize yes
  pidfile 7003.pid
  cluster-enabled yes
  cluster-config-file 7003_node.conf
  cluster-node-timeout 15000
  appendonly yes
  ```

- 在conf⽬录下创建⽂件7004.conf，编辑内容如下

  ```
  port 7004
  bind 172.16.179.131
  daemonize yes
  pidfile 7004.pid
  cluster-enabled yes
  cluster-config-file 7004_node.conf
  cluster-node-timeout 15000
  appendonly yes
  ```

- 在conf⽬录下创建⽂件7005.conf，编辑内容如下

  ```
  port 7005
  bind 172.16.179.131
  daemonize yes
  pidfile 7005.pid
  cluster-enabled yes
  cluster-config-file 7005_node.conf
  cluster-node-timeout 15000
  appendonly yes
  ```

- 使⽤配置⽂件启动redis服务

  ```
  redis-server 7003.conf
  redis-server 7004.conf
  redis-server 7005.conf
  ```

### 创建集群

- redis的安装包中包含了redis-trib.rb，⽤于创建集群
- 接下来的操作在172.16.179.130机器上进⾏
- 将命令复制，这样可以在任何⽬录下调⽤此命令

```shell
sudo cp /usr/share/doc/redis-tools/examples/redis-trib.rb /usr/local/bin/
```

* 安装ruby环境，因为redis-trib.rb是⽤ruby开发的

  > sudo apt-get install ruby

* 运⾏如下命令创建集群

  ```
  redis-trib.rb create --replicas 1 172.16.179.130:7000 172.16.179.130:7001 172.16.179.130:7002 172.16.179.131:7003 172.16.179.131:7004 172.16.179.131:7005
  ```

### 数据验证

* 在172.16.179.131机器上连接7002，加参数-c表示连接到集群

  > redis-cli -h 172.16.179.131 -c -p 7002

* 写⼊数据

  > set name kastrcn

 

### 写入规则

在哪个服务器上写数据：CRC16

- redis cluster在设计的时候，就考虑到了去中⼼化，去中间件，也就是说，集群中 的每个节点都是平等的关系，都是对等的，每个节点都保存各⾃的数据和整个集 群的状态。每个节点都和其他所有节点连接，⽽且这些连接保持活跃，这样就保 证了我们只需要连接集群中的任意⼀个节点，就可以获取到其他节点的数据
- Redis集群没有并使⽤传统的⼀致性哈希来分配数据，⽽是采⽤另外⼀种叫做哈希 槽 (hash slot)的⽅式来分配的。redis cluster 默认分配了 16384 个slot，当我们 set⼀个key 时，会⽤CRC16算法来取模得到所属的slot，然后将这个key 分到哈 希槽区间的节点上，具体算法就是：CRC16(key) % 16384。所以我们在测试的 时候看到set 和 get 的时候，直接跳转到了7000端⼝的节点
- Redis 集群会把数据存在⼀个 master 节点，然后在这个 master 和其对应的salve 之间进⾏数据同步。当读取数据时，也根据⼀致性哈希算法到对应的 master 节 点获取数据。只有当⼀个master 挂掉之后，才会启动⼀个对应的 salve 节点，充 当 master
- 需要注意的是：必须要3个或以上的主节点，否则在创建集群时会失败，并且当存 活的主节点数⼩于总节点数的⼀半时，整个集群就⽆法提供服务了

## Python交互

* 安装

  > pip install redis-py-cluster

* 创建⽂件redis_cluster.py，示例码如下

  ```python
  from rediscluster import *
  if __name__ == '__main__':
    try:
        # 构建所有的节点，Redis会使⽤CRC16算法，将键和值写到某个节点上
        startup_nodes = [
            {'host': '192.168.26.128', 'port': '7000'},
            {'host': '192.168.26.130', 'port': '7003'},
            {'host': '192.168.26.128', 'port': '7001'},
        ]
        # 构建StrictRedisCluster对象
        src=StrictRedisCluster(startup_nodes=startup_nodes,decode_responses=True)
        # 设置键为name、值为itheima的数据
        result=src.set('name','itheima')
        print(result)
        # 获取键为name
        name = src.get('name')
        print(name)
    except Exception as e:
        print(e)
  ```
