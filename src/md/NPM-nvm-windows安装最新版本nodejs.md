# nvm windows 安装最新版本 nodejs(11.12.0) NPM 安装失败解决办法

查看我的 nvm 版本 `nvm version`

```sh
$ nvm version
1.1.6
```

我当前是 1.1.6 版本

查看最新可用 nodejs 版本

```sh
$ nvm ls available

|   CURRENT    |     LTS      |  OLD STABLE  | OLD UNSTABLE |
|--------------|--------------|--------------|--------------|
|   11.12.0    |   10.15.3    |   0.12.18    |   0.11.16    |
|   11.11.0    |   10.15.2    |   0.12.17    |   0.11.15    |
|   11.10.1    |   10.15.1    |   0.12.16    |   0.11.14    |
|   11.10.0    |   10.15.0    |   0.12.15    |   0.11.13    |
|    11.9.0    |   10.14.2    |   0.12.14    |   0.11.12    |
|    11.8.0    |   10.14.1    |   0.12.13    |   0.11.11    |
|    11.7.0    |   10.14.0    |   0.12.12    |   0.11.10    |
|    11.6.0    |   10.13.0    |   0.12.11    |    0.11.9    |
|    11.5.0    |    8.15.1    |   0.12.10    |    0.11.8    |
|    11.4.0    |    8.15.0    |    0.12.9    |    0.11.7    |
|    11.3.0    |    8.14.1    |    0.12.8    |    0.11.6    |
|    11.2.0    |    8.14.0    |    0.12.7    |    0.11.5    |
|    11.1.0    |    8.13.0    |    0.12.6    |    0.11.4    |
|    11.0.0    |    8.12.0    |    0.12.5    |    0.11.3    |
|   10.12.0    |    8.11.4    |    0.12.4    |    0.11.2    |
|   10.11.0    |    8.11.3    |    0.12.3    |    0.11.1    |
|   10.10.0    |    8.11.2    |    0.12.2    |    0.11.0    |
|    10.9.0    |    8.11.1    |    0.12.1    |    0.9.12    |
|    10.8.0    |    8.11.0    |    0.12.0    |    0.9.11    |
|    10.7.0    |    8.10.0    |   0.10.48    |    0.9.10    |

This is a partial list. For a complete list, visit https://nodejs.org/download/release
```

好了，现在我们来安装最新的`11.12.0`

```sh
$ nvm install 11.12.0
Downloading node.js version 11.12.0 (64-bit)...
Complete
Downloading npm version 6.7.0... Download failed. Rolling Back.
Rollback failed. remove C:\Users\xxxx\AppData\Roaming\nvm\temp\npm-v6.7.0.zip: The process cannot access the file because it is being used by another process.
Could not download npm for node v11.12.0.
Please visit https://github.com/npm/npm/releases/tag/v6.7.0 to download npm.
It should be extracted to C:\Users\xxxx\AppData\Roaming\nvm\v11.12.0
```

然而失败了。上面说 npm 安装失败。 让我到https://github.com/npm/npm/releases/tag/v6.7.0下载手动安装。访问上面地址根本不存在。好吧，我们去看看到底怎么回事。 访问 https://github.com/npm/npm 你会看到 **his repository has been archived by the owner. It is now read-only.** **This repository is moving to: https://github.com/npm/cli http://npm.community/** 原来仓库已经迁移。好吧，那我们去新仓库 https://github.com/npm/cli 手动安装 npm

1. 切换到 nodejs 安装目录

```sh
$ cd C:\Users\xxx\AppData\Roaming\nvm\v11.12.0

C:\Users\xxx\AppData\Roaming\nvm\v11.12.0
```

2. 安装指定版本的 npm. 上面错误提示安装的是 v6.7.0,那我们也安装 v6.7.0

```sh
$ cd node_modules
$ git clone -b v6.7.0 https://github.com/npm/cli.git
```

等待 clone 结束， 你会发现多了一个 cli 目录出来，这就是我们 npm@v6.7.0 的源码。

3. 把拷贝执行文件

把`cli/bin`目录下的`npm npm.cmd npx npx.cmd`拷贝到`C:\Users\xxxx\AppData\Roaming\nvm\v11.12.0`

4. 把 cli 目录重名名为 npm

#### 大功告成！！

```sh
$ npm -v
6.7.0

$ npx -v
6.7.0
```
