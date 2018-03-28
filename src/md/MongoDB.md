知乎搜索怎么学MongoDB
- 最好直接查看英文文档。

```shell
# 启动mongdb服务 --dbpath指定数据存储路径 一般这样就ok了
# 其他相关参数：--logpath "C:\data\log\mongodb.log" 指定日志存放文件 注意要先创建C:\data\log\mongodb.log 不然报错; --storageEngine=mmapv1 win32不支持mongodb的默认存储引擎wiredTiger, 所以win32位机上要用这个命令切换引擎。同时在win32上要 --journal才能保存日志
mongod.exe --dbpath="C:\data\db"

# 打开自带的shell 客户端
# mongo.exe 127.0.0.1:27017/dbname
mongo.exe
```

#### 常用命令
```shell
# 产看命令 help
db.help()
# 查看当前所在数据库的名字
db
# use + 数据库的名字 表示切换/创建数据库 不存在的时候创建
use test
# 显示所有有数据的数据库 没有数据的数据库不会显示
show dbs
# 删除当前数据库
db.dropDatabase()
# 查看当前数据库的状态
db.stats()
# 查看版本
db.version()
# 查看当前链接机器的IP
db.getMongo()
```
由于mongoDB支持js 所有可以直接在客户端shell中敲js代码
