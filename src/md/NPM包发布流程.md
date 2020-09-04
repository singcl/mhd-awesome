## npm包发布流程

* 1. `npm init`初始化一个项目。按提示填写完成。
* 2. [注册NPM仓库账号](https://www.npmjs.com)。已经注册过请跳过此步。
* 3. `npm adduser`添加账号，按提示完成操作。
* 4. `npm publish`发布到NPM。

**至此发布流程完成。请到https://www.npmjs.com搜索刚刚发布的包**
### 后续操作
* `npm version patch` 更新版本号然后再发布`npm publish`

### 相关操作
* 查看模块拥有者:`npm owner ls <package_name>`
* 添加一个发布者:`npm owner add <user> <package_name>`
* 删除一个发布者:`npm owner rm <user> <package_name>`
* 查询版本信息： `npm version`
* 查询详细信息： `npm info`
* 查看当前项目引用了哪些包 `npm ls`
* `npm unpublish`这个命令有的仓储支持，有的仓储不支持。npmjs.org早期也是支持的，但2015年后已经声明过不支持删除已经发布的包，详见`npm issue`。类似情况推荐使用命令`npm deprecate` 2016有一个大牛的删库事件导致很多依赖它的著名的npm包构建失败，甚至影响到了不少公司的生产环境。从那时候开始npm就更改了unpublish的策略。
没记错的话好像是半小时内你可以删除自己发布的库，之后你就再也不能删除了。详细内容可以上npm官网看它们的blog。

### 带有命名空间的NPM包
有些时候需要创建一个公司内部使用的模块，或者某个模块已经有了同名的模块存在，这个时候可以用到带有命名空间的模块，其名称形如 `@scope/project`，在 `npm` 上面带有命名空间的模块默认是私有的，而且每个用户有一个属于自己的命名空间也就是 `@username`，在 `npm` 上私有的模块是要付费的，因此为了免费地发布一个带有命名空间的模块，需要将该模块设置为公开的，只需要在执行 publish 的时候加上 --access=public 选项即可。

在安装这些带有命名空间的模块的时候需要这样安装 `npm install @scope/project --save`，在项目中引用的时候也要带上 `scope`，`require('@scope/project')`。

### 使用 tag
`npm` 也允许开发着给某个版本打 `tag`，比如当版本进行到 `1.0.9` 的时候可以给他打个 `tag` 叫做 `beta`，这个时候用户可以使用 `npm i project-name@beta` 来安装这个版本，这等价于 `npm i project@1.0.9`

使用 `npm dist-tag add <package>@<version> tag` 来给某个版本打 `tag`，默认情况下载 `npm publish` 的时候 `npm` 会给当前版本打一个` tag` 叫做 `latest`，表示这是最新的，可以使用 `npm publish --tag <tag-name>` 来改变默认的 `tag`。


## 常见错误
如果项目中有`.npmrc`文件，请先清空再publish 不然会报错！

```sh
npm ERR! code E404
npm ERR! 404 Not Found - PUT https://registry.npmjs.org/@singcl%2fthrottle-debounce - Not found
npm ERR! 404 
npm ERR! 404  '@singcl/throttle-debounce@1.1.1' is not in the npm registry.
npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
npm ERR! 404 
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.
```
方案：切回npm官方源，不要用淘宝源`nrm ls`  `nrm use npm`;再走上面3，4流程。
