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
