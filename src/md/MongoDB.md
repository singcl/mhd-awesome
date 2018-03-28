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
