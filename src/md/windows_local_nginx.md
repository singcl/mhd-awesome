# Windows 本地安装NGINX 服务器方法

nginx功能之一可以启动一个本地服务器，通过配置server_name和root目录等来访问目标文件

*nginx下载地址：http://nginx.org/*

* **注意不要直接双击nginx.exe，这样会导致修改配置后重启、停止nginx无效，需要手动关闭任务管理器内的所有nginx进程**
 
* 1、在nginx.exe目录，打开命令行工具，用命令启动/关闭/重启nginx 
* 启动命令如下：
 * start nginx : 启动nginx
 * nginx -s reload  ：修改配置后重新加载生效
 * nginx -s reopen  ：重新打开日志文件
 * nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确

---
* 关闭nginx命令：
 * nginx -s stop  :快速停止nginx
 * nginx -s quit  ：完整有序的停止nginx

---
* 启动失败错误分析：
 * 1、bash: nginx: command not found
 有可能是你再linux命令行环境下运行了windows命令，如果你之前是允许 nginx -s reload报错， 试下 ./nginx -s reload或者用windows系统自带命令行工具运行
 * 2、如果发现进程中并没有NGINX进程，那么说明你安装失败，你可以到你的Nginx安装目录下的logs文件夹下查看error文件。如果发现里面写着：
 
 `2017/12/20 19:33:31 [emerg] 11936#9452: bind() to 0.0.0.0:80 failed (10013: An attempt was made to access a socket in a way forbidden by its access permissions)`

说明你的80端口被占用了，或是cmd命令进入dos下执行：netstat -aon | findstr :80 查看80端口是否被占用，如果占用，那么你需要修改注册表或者修改conf配置文件。

* 修改注册表
 * 1、打开注册表：regedit
 * 2、找到：HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\services\HTTP
 * 3、找到一个REG_DWORD类型的项Start，将其改为0
 * 4、重启系统，System进程不会占用80端口

* 修改配置文件（推荐）
 * 打开nginx.conf配置文件讲server listen端口改成没用使用的端口即可，重启nginx命令。
