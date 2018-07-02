// 对比ES6的类： https://www.jianshu.com/p/29e19b4a7caa
// ES6的类对比ES5的构造函数可以参考阮一峰的ES6入门教程class章节

// TS类详解 对比 ES6的类
class Greeter {
    public static greeting: string; // 类的静态属性（没有赋值的话默认为undefined）
    public static greeting2: string = "greeting2"; // 类的静态属性（有赋值返回：greeting2）
    public static greetFunc: () => number; // 类的静态方法（没有赋值的话默认为undefined）
    public static greetFunc2: () => number = () => 45; // 类的静态方法 有赋值为函数：() => 45
    public x: number = 2; // 类的实例属性 > 直接赋值
    public greeting: string; // 类的实例属性 > 不直接赋值，在constructor中赋值
    public callback: () => void; // 类的实例方法 > 不直接赋值，在constructor中赋值
    protected xxxx: string = "类的受保护的属性"; // 受保护的实例属性 > 在类内部可用，还可以在派生类的方法中使用
    private xxx: string = "类的私有属性"; // 私有实例属性 > 在类内部可用
    // 使用了参数属性：参数属性通过给构造函数参数添加一个访问限定符来声明来创建同时初始化一个实例成员
    constructor(private kkk: string, message: string, callback: () => void) {
        this.greeting = message;
        this.callback = callback;
    }
    public ca: () => string = () => "333"; // 类的实例方法 > 直接赋值

    // 类的原型方法的一般写法
    public greet<T>(arg: T) {
        const x: T = arg;
        return x;
    }

    // 用getter和setter实现类的原型属性
    public get xx() {
        return this.xxx;
    }

    public set xx(value) {
        this.xxx = value;
    }
}

const g = new Greeter("kkk", "hello", () => 3);
console.log(g.greet<string>("hhhee"));
console.log(Greeter.greeting2);
console.log(Greeter.greetFunc);
console.log(Greeter.prototype);
console.log(typeof Greeter);

// 返回真正定义在实例对象this上而不是原型上的方法/属性
console.log(Object.getOwnPropertyNames(g)); // [ 'x', 'xxxx', 'xxx', 'ca', 'greeting', 'callback' ]
console.log(Object.getPrototypeOf(g));

// public private protected readonly 修饰符可以修饰实例属性/方法 原型属性/方法 静态属性方法
// 也就是说：
// public private protected readonly 属于一类概念
// 实例属性/方法 原型属性/方法 静态属性方法 属于一类概念

// 在TS文档中：
// 把TS的类分为：静态部分和实例部分两部分，也就是说没有原型部分的概念。
// 通过Object.getPrototypeOf(g)获取的原型对象也是空。 这个我有点搞不太懂？？？
