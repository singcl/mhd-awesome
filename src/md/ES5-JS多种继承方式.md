### JS继承的实现
既然要实现继承，那么首先我们得有一个父类
```js
// 定义一个动物类
function Animal(name) {
    // 实例属性
    this.name = name || 'Animal'
    // 实例方法
    this. sleep = function() {
        console.log(this.name + '正在睡觉！')
    }
}

// 原型方法
Animal.prototype.eat = function(food) {
    console.log(this.name + '正在吃' + food)
}
```
#### 1. 原型链继承
**核心**：将父类的实例作为子类的原型
```js
function Cat(color) {
    // 实例属性
    this.color = color || 'Black'
    // 实例方法
    this.catch = function(arg) {
        console.log(this.name + '正在抓' + arg)
    }
}
// Cat的原型对象指向Animal实例
// 这样Cat的原型对象上就有了Animal实例的属性和方法，从而实现继承
Cat.prototype = new Animal()
// 先继承后再添加Cat自己原型属性或方法
// 可以命名相同的名字以覆盖继承的属性或方法
Cat.prototype.name = 'cat'
Cat.prototype.climb = function(arg) {
    console.log('快看！快看！颜色为' + this.color + '的' + this.name + '正在爬' + arg)
}

//　Test Code
var cat = new Cat('RED')
// 继承的name属性被自定义的name属性替代
console.log(cat.name)                       // cat
// 继承的方法
console.log(cat.sleep())                    // cat正在睡觉
console.log(cat.eat('fish'))                // cat正在吃fish
// Cat 实例属性和方法
console.log(cat.color)                      // RED
console.log(cat.catch('mouse'))             // cat正在抓mouse
console.log(cat.climb('tree'))              // 快看！快看！颜色为RED的cat正在爬tree
console.log(cat instanceof Animal)          //true 
console.log(cat instanceof Cat)             //true
```
**特点:**
1. 非常纯粹的继承关系，实例是子类的实例，也是父类的实例
2. 父类新增原型方法/原型属性，子类都能访问到
3. 简单，易于实现
4. 要想为子类新增**原型属性和方法**，必须要在new Animal()这个语句之后执行
5. 无法实现多继承
6. 来自原型对象的**引用属性**是所有实例共享的
7. 创建子类实例时，无法向父类构造函数传参

推荐指数：🔥🔥 .

#### 2. Call(Apply)继承
**核心**：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性/方法给子类（没用到原型）
```js
function Cat(color, name) {
    // Animal当做普通函数调用call方法传入this
    Animal.call(this, name)
    // 实例属性
    this.color = color || 'Black'
    // 实例方法
    this.catch = function(arg) {
        console.log(this.name + '正在抓' + arg)
    }
}

Cat.prototype.climb = function(arg) {
    console.log('快看！快看！颜色为' + this.color + '的' + this.name + '正在爬' + arg)
}

//　Test Code
var cat = new Cat('RED', 'cat')
// 继承的name属性被自定义的name属性替代
console.log(cat.name)                       // cat
// 继承的方法
console.log(cat.sleep())                    // cat正在睡觉
// 无法继承父类原型方法
console.log(cat.eat('fish'))                // TypeError: cat.eat is not a function
// Cat 实例属性和方法
console.log(cat.color)                      // RED
console.log(cat.catch('mouse'))             // cat正在抓mouse
console.log(cat.climb('tree'))              // 快看！快看！颜色为RED的cat正在爬tree
console.log(cat instanceof Animal)          // false 
console.log(cat instanceof Cat)             // true

```

**特点:**
1. 解决了1中，子类实例共享父类**引用属性**的问题
2. 创建子类实例时，可以向父类传递参数
3. 可以实现多继承（call多个父类对象）
4. 实例并不是父类的实例，只是子类的实例
5. 只能继承父类的实例属性和方法，不能继承原型属性/方法
6. 无法实现函数复用，每个子类都有父类实例属性/方法(包含引用属性)的副本，影响性能

推荐指数：🔥🔥.

#### 3. 实例继承

**核心**：为父类实例添加新特性，作为子类实例返回
```js
function Cat(color, name) {
    // 创建父类实例
    var instance = new Animal(name)
    // 实例属性
    instance.color = color || 'Black'
    // 实例方法
    instance.catch = function(arg) {
        console.log(this.name + '正在抓' + arg)
    }
    // 构造函数中用return语句返回的用法请自行Google
    return instance
}

Cat.prototype.climb = function(arg) {
    console.log('快看！快看！颜色为' + this.color + '的' + this.name + '正在爬' + arg)
}

//　Test Code
var cat = new Cat('RED', 'cat')
// 继承的name属性被自定义的name属性替代
console.log(cat.name)                       // cat
// 继承的方法
console.log(cat.sleep())                    // cat正在睡觉
console.log(cat.eat('fish'))                // cat正在吃fish
// Cat 实例属性和方法
console.log(cat.color)                      // RED
console.log(cat.catch('mouse'))             // cat正在抓mouse
console.log(cat.climb('tree'))              // TypeError: cat.climb is not a function
console.log(cat instanceof Animal)          // true 
console.log(cat instanceof Cat)             // false
```
**特点:**
1. 不限制调用方式，不管是new Cat()还是Cat(),返回的对象具有相同的效果(优点工厂函数的味道)
2. 创建子类实例时，可以向父类传递参数
3. 实例是父类的实例，不只是子类的实例
4. 无法继承子类原型属性/方法
5. 不支持多重继承

推荐指数：🔥 .

#### 4. 组合继承
**核心：**通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
```js
function Cat(color, name) {
    // Animal当做普通函数调用call方法传入this
    Animal.call(this, name)
    // 实例属性
    this.color = color || 'Black'
    // 实例方法
    this.catch = function(arg) {
        console.log(this.name + '正在抓' + arg)
    }
}

Cat.prototype = new Animal()
Cat.prototype.climb = function(arg) {
    console.log('快看！快看！颜色为' + this.color + '的' + this.name + '正在爬' + arg)
}

//　Test Code
var cat = new Cat('RED', 'cat')
// 继承的name属性被自定义的name属性替代
console.log(cat.name)                       // cat
// 继承的方法
console.log(cat.sleep())                    // cat正在睡觉
console.log(cat.eat('fish'))                // cat正在吃fish
// Cat 实例属性和方法
console.log(cat.color)                      // RED
console.log(cat.catch('mouse'))             // cat正在抓mouse
console.log(cat.climb('tree'))              // 快看！快看！颜色为RED的cat正在爬tree
console.log(cat instanceof Animal)          // true 
console.log(cat instanceof Cat)             // true
// cat的构造器
console.log(cat.constructor)                // [Function: Animal]
```
**特点:**
1. 可以继承父类实例属性/方法，也可以继承原型属性/方法
2. 创建子类实例时，可以向父类传递参数
3. 既是子类的实例，也是父类的实例
4. 不存在引用属性共享问题
5. 支持多重继承
6. 函数可复用
7. 调用了两次父类构造函数，生成了两份实例属性/方法(一份在cat实例上， 一份在cat 原型对象上)
8. cat的constructor 指向的Animal而不是Cat

推荐指数：🔥🔥🔥🔥.

#### 寄生组合继承
**核心：**通过寄生方式，砍掉父类的实例属性，这样，在第二次调用父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
```js
function Cat(color, name) {
    // Animal当做普通函数调用call方法传入this
    Animal.call(this, name)
    // 实例属性
    this.color = color || 'Black'
    // 实例方法
    this.catch = function(arg) {
        console.log(this.name + '正在抓' + arg)
    }
}

(function() {
    // 创建一个没有实例的方法
    var Super = function() {}
    Super.prototype = Animal.prototype
    //将实例作为子类的原型
    Cat.prototype = new Super()
    // 修复Cat构造器指向
    Cat.prototype.constructor = Cat
})()

Cat.prototype.climb = function(arg) {
    console.log('快看！快看！颜色为' + this.color + '的' + this.name + '正在爬' + arg)
}

//　Test Code
var cat = new Cat('RED', 'cat')
// 继承的name属性被自定义的name属性替代
console.log(cat.name)                       // cat
// 继承的方法
console.log(cat.sleep())                    // cat正在睡觉
console.log(cat.eat('fish'))                // cat正在吃fish
// Cat 实例属性和方法
console.log(cat.color)                      // RED
console.log(cat.catch('mouse'))             // cat正在抓mouse
console.log(cat.climb('tree'))              // 快看！快看！颜色为RED的cat正在爬tree
console.log(cat instanceof Animal)          // true 
console.log(cat instanceof Cat)             // true
// cat的构造器
console.log(cat.constructor)                // [Function: Cat]
```
**特点:**
1. 可以继承父类实例属性/方法，也可以继承原型属性/方法
2. 创建子类实例时，可以向父类传递参数
3. 既是子类的实例，也是父类的实例
4. 不存在引用属性共享问题
5. 支持多重继承
6. 函数可复用
7. cat的constructor 正确的指向了Cat
8. 堪称完美的继承方式

推荐指数：🔥🔥🔥🔥🔥.
