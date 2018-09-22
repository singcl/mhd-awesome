class Base {
    constructor(param) {
        //这也是定义属性的一种方式
        this.prop = param
    }
}
class Child extends Base {
    constructor(param) {
        //执行父类构造器(添加prop属性)
        super(param)
    }
    //创建原型属性需要手写get set 也比较符合"类"
    get prop1() {
        return this._prop1
    }
    set prop1(val) {
        this._prop1 = val
    }
    //原型成员函数
    getName() {
        return "vijay"
    }
    //实例成员函数 实例调用函数时优先调用实例身上的函数
    getName = () => {
        return "obj"
    }
    //实例成员属性
    prop2 = "prop2"
    //整个class构造器函数(函数也是对象)的属性
    static prop3 = "prop3"
}

console.log(new Child().getName()) //"obj"
