# for-in_Object.keys_Object.getOwnPropertyNames_Object.getOwnPropertySymbols_Reflect.keys

## for in

以**特定顺序**遍历一个**对象及其原型链**的所有**可枚举属性（但是不包括 Symbol）**。

```js
const sym = Symbol("key");

const obj = {
    key: 23,
    name: "singcl",
    action: Symbol("action"),
    [sym]: "symbol",
    3: "the number is 3",
    1: "the number is 1"
};

// 使用 Object.defineProperty() 给obj添加一个不可枚举属性
Object.defineProperty(obj, "water", {
    enumerable: false,
    value: "这是一个不可枚举属性"
});

// 使用 Object.defineProperty() 给obj添加一个可枚举属性
Object.defineProperty(obj, "people", {
    enumerable: true,
    value: "这是一个可枚举属性"
});

// 设置对象原型
Object.setPrototypeOf(obj, { protoKey: "这是一个定义在原型上的属性" });

// for-in 遍历对象
const res = [];
for (const key in obj) {
    res.push(key);
}

// 输出遍历结果
console.log(res); // [ '1', '3', 'key', 'name', 'action', 'people', 'protoKey' ]
console.log(obj.protoKey); // 这是一个定义在原型上的属性

console.log(obj.water); // 这是一个不可枚举属性
console.log(obj.people); // 这是一个可枚举属性

console.log(obj.propertyIsEnumerable("water")); // false
console.log(obj.propertyIsEnumerable("people")); // true

console.log(obj.propertyIsEnumerable(sym)); // true
```

现在我们就来一样解释:

#### 特定顺序

我们在`obj`上添加的属性的顺序和我们最终`for-in`循环输出的结果的顺序并不一致，那么`for-in`遍历到底是- 按什么顺序遍历的呢？

1. 首先遍历所有数值键，按照数值升序排列。
2. 其次遍历所有字符串键，按照加入时间升序排列。
3. ~~最后遍历所有 Symbol 键，按照加入时间升序排列~~

#### 对象及其原型链

`for-in`循环遍历对象时候会遍历对象以及对象原型链上的属性。上面`protoKey`是定义在对象的原型上而不是对象本身上。但是依然被`for-in`遍历到了。

#### 可枚举属性

-   `water`是我们使用`Object.defineProperty()`定义在 obj 上的一个不可枚举属性
-   `people`是我们使用`Object.defineProperty()`定义在 obj 上的一个可枚举属性

观察`for-in`循环的输出结果我们看的`people`被遍历到了，而`water`却没有被遍历到。我们再次来确认下：

```js
// 查看obj 上是否有water和people属性
console.log(obj.water); // 这是一个不可枚举属性
console.log(obj.people); // 这是一个可枚举属性

// 确定water 和 people 是否可枚举
console.log(obj.propertyIsEnumerable("water")); // false
console.log(obj.propertyIsEnumerable("people")); // true
```

的确 `people` 是 obj 上可枚举属性，被遍历到了，而`water`是 obj 上不可枚举属性，没有被遍历到。

obj 上`key, name, action`等通过字面量方式添加的属性默认是可枚举的。

#### 但是不包括 Symbol

你可能有疑问: obj 上 `Symbol`类型的属性`sym` 也没有被遍历到，是不是因为它是不可枚举属性？
那么我们验证下：

```js
console.log(obj.propertyIsEnumerable(sym)); // true
```

咦？obj 上 `Symbol`类型的属性`sym`是可枚举的，但是却没有被遍历到。

这就是为什么要单独指出：**可枚举属性（但是不包含 Symbol）**
要想获得`Symbol`类型的属性，我们可以使用`Object.getOwnPropertySymbols()`。这里就不讲了，如果有兴趣可以自己去了解。

### 总结

以**特定顺序**遍历一个**对象及其原型链**的所有**可枚举属性（但是不包括 Symbol）**。

`for-in`循环的**4**个要点：

1. 特定顺序
2. 对象及其原型链
3. 可枚举属性
4. 不包含 Symbol 类型

_参考：[ECMAScript6 入门](http://es6.ruanyifeng.com/#docs/object#__proto__%E5%B1%9E%E6%80%A7%EF%BC%8CObject-setPrototypeOf%EF%BC%8CObject-getPrototypeOf)_
