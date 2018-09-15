const sym = Symbol("key")

const obj = {
    key: 23,
    name: "singcl",
    action: Symbol("action"),
    [sym]: "symbol",
    3: "the number is 3",
    1: "the number is 1"
}

// 使用 Object.defineProperty() 给obj添加一个不可枚举属性
Object.defineProperty(obj, "water", {
    enumerable: false,
    value: "这是一个不可枚举属性"
})

// 使用 Object.defineProperty() 给obj添加一个可枚举属性
Object.defineProperty(obj, "people", {
    enumerable: true,
    value: "这是一个可枚举属性"
})

// 设置对象原型
Object.setPrototypeOf(obj, { protoKey: "这是一个定义在原型上的属性" })

// for-in 遍历对象
const res = []
for (const key in obj) {
    res.push(key)
}

// 输出遍历结果
console.log(res) // [ '1', '3', 'key', 'name', 'action', 'people', 'protoKey' ]
console.log(obj.protoKey) // 这是一个定义在原型上的属性

console.log(obj.water) // 这是一个不可枚举属性
console.log(obj.people) // 这是一个可枚举属性

console.log(obj.propertyIsEnumerable("water")) // false
console.log(obj.propertyIsEnumerable("people")) // true

console.log(obj.propertyIsEnumerable(sym)) // true
