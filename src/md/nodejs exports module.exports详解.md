### 基本
require的时候只能module.exports这个对象，它是看不到exports对象的。而我们在编写nodejs模块用到的exports对象实际上是对module.exports对象的引用。

Nodejs文档中 "exports" 的说明 Modules Node.js v0.10.33 Manual & Documentation:

> exports alias#
>
> The exports variable that is available within a module starts as a reference
to module.exports. As with any variable, if you assign a new value to it, it
is no longer bound to the previous value.

### 示例
```js
// 我们经常看到这样的写法：
exports = module.exports = something

// 上面代码等价于：
module.exports = something
exports = module.exports
```
新建nodejs模块时默认关系是：
```js
module.exports = {}
exports = module.exports
```
他们引用同一块内存空间。

module.exports = somethings 是对 module.exports 进行了覆盖，此时 module.exports 和 exports 的关系断裂，不在指向同一块内存空间，module.exports 指向了新的内存块，而 exports 还是指向原来的内存块，为了让 module.exports 和 exports 还是指向同一块内存或者说指向同一个 “对象”，所以我们就 exports = module.exports。
