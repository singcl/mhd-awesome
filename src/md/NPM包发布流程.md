## npm包发布流程

* 1. `npm init`初始化一个项目。按提示填写完成。
* 2. [注册NPM仓库账号](https://www.npmjs.com)。已经注册过请跳过此步。
* 3. `npm adduser`添加账号，按提示完成操作。
* 4. `npm publish`发布到NPM。

**至此发布流程完成。请到https://www.npmjs.com搜索刚刚发布的包**

### 相关操作
* 查看模块拥有者:`npm owner ls <package_name>`
* 添加一个发布者:`npm owner add <user> <package_name>`
* 删除一个发布者:`npm owner rm <user> <package_name>`
* 查看当前项目引用了哪些包 `npm ls`
* `npm unpublish`这个命令有的仓储支持，有的仓储不支持。npmjs.org早期也是支持的，但2015年后已经声明过不支持删除已经发布的包，详见`npm issue`。类似情况推荐使用命令`npm deprecate` 2016有一个大牛的删库事件导致很多依赖它的著名的npm包构建失败，甚至影响到了不少公司的生产环境。从那时候开始npm就更改了unpublish的策略。
没记错的话好像是半小时内你可以删除自己发布的库，之后你就再也不能删除了。详细内容可以上npm官网看它们的blog。
