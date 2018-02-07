## npm package.json ~version and ^version
`package.json`中dependency的versioin版本号写法经常把人搞晕，下面我们总结下各种写法的含义：
官方英文文档有一小段介绍：https://docs.npmjs.com/files/package.json#version

### 那么~和^的作用和区别

~会匹配最近的小版本依赖包，比如~1.2.3会匹配所有1.2.x版本，但是不包括1.3.0
^会匹配最新的大版本依赖包，比如^1.2.3会匹配所有1.x.x的包，包括1.3.0，但是不包括2.0.0
详细可参考http://stackoverflow.com/questions/22343224/whats-the-difference-between-tilde-and-caret-in-package-json

那么该如何选择呢？当然你可以指定特定的版本号，直接写1.2.3，前面什么前缀都没有，这样固然没问题，但是如果依赖包发布新版本修复了一些小bug，那么需要手动修改package.json文件；~和^则可以解决这个问题。

但是需要注意^版本更新可能比较大，会造成项目代码错误，比如这篇文章（http://blog.csdn.net/u014291497/article/details/54427103）的问题就是因为package.json使用^1.5.7造成的，1.6版本的包与现有代码不兼容。

所以建议使用~来标记版本号，这样可以保证项目不会出现大的问题，也能保证包中的小bug可以得到修复。

*这意味着安装最新版本的依赖包，但缺点同上，可能会造成版本不兼容，慎用！

### Semver
语义化版本：http://semver.org/lang/zh-CN/
      
    版本格式：主版本号.次版本号.修订号，版本号递增规则如下： 
    主版本号：当你做了不兼容的API 修改， 
    次版本号：当你做了向下兼容的功能性新增， 
    修订号：当你做了向下兼容的问题修正。 
    先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。

### node-semver NPM语义化版本号
npm 官方有专门的工具，来解析这个semver: https://github.com/npm/node-semver

### npm install `<name>@<version>`
指定安装的package 版本
```java
npm install (with no args in a package dir)
npm install <tarball file>
npm install <tarball url>
npm install <folder>
npm install [@<scope>/]<name> [--save|--save-dev|--save-optional] [--save-exact]
npm install [@<scope>/]<name>@<tag>
npm install [@<scope>/]<name>@<version>
npm install [@<scope>/]<name>@<version range>
npm i (with any of the previous argument usage)
```
