```js
//单例模式抽象，分离创建对象的函数和判断对象是否已经创建
var getSingle = function (fn) {
    var result;
    return function () {
        return result || ( result = fn.apply(this, arguments) );
    }
};
```
形参fn是我们的构造函数，我们只要传入任何自己需要的构造函数，就能生成一个新的惰性单例。当调用一次getSingle(), 如果以后再调getSingle(),也只会返回刚才创建的实例。

#### 单例常用场景
当前业务中就用到。 在nodejs端用redis来做缓存服务缓存rssesion，同时ACL资源权限控制我也用Redis.这个时候我只需要在项目启动的时候创建一个Redis实例即可，Rsession和ACL共享一个redis实例。
