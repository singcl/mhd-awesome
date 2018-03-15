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

// Test Code
var cat = new Cat('RED', 'cat')
// 继承的name属性被自定义的name属性替代
console.log(cat.name)                       // cat
// 继承的方法
console.log(cat.sleep())                    // cat正在睡觉
// 无法继承父类原型方法
console.log(cat.eat('fish'))                // cat正在吃fish
// Cat 实例属性和方法
console.log(cat.color)                      // RED
console.log(cat.catch('mouse'))             // cat正在抓mouse
console.log(cat.climb('tree'))              // TypeError: cat.climb is not a function
console.log(cat instanceof Animal)          // true
console.log(cat instanceof Cat)             // true
// cat的构造器
console.log(cat.constructor)                // [Function: Animal]
