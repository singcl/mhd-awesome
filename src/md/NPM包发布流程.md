## npm包发布流程

* 1. `npm init`初始化一个项目。按提示填写完成。
* 2. [注册NPM仓库账号](https://www.npmjs.com)。已经注册过请跳过此步。
* 3. `npm adduser`添加账号，按提示完成操作。
* 4. `npm publish`发布到NPM。

**至此发布流程完成。请到https://www.npmjs.com搜索刚刚发布的包**

###相关操作
* 查看模块拥有者:`npm owner ls <package_name>`
* 添加一个发布者:`npm owner add <user> <package_name>`
* 删除一个发布者:`npm owner rm <user> <package_name>`
