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
var cat = new Cat('RED')
console.log(cat.name)
console.log(cat.sleep())
console.log(cat.eat('fish'))
console.log(cat.color)
console.log(cat.catch('mouse'))
console.log(cat.climb('tree'))
console.log(cat instanceof Animal)          //true
console.log(cat instanceof Cat)             //true
