/**
 * 自定义Mhd 类 实例是一个Array-like对象
 * @param {String|Number|Boolean|Null|Undefined|Symbol}  原始数据类型优先
 * @constructor Mhd
 */
function Mhd() {
    var len = arguments.length
    len === 1 && isArray(arguments[0])
        ? AddProperty.call(this, arguments[0])
        : AddProperty.call(this, arguments)
}

// Mhd 原型方法

/**
 * 数组/对象的forEachF方法
 * @param {Object=}     thisArg             callback 回调函数中 this 上下文
 * @param {Mhd~forEachCallback} callback    forEach的回调函数
 */

/**
 * This callback is displayed as part of the Mhd class.
 * @callback Mhd~forEachCallback
 * @param {String|Object}   kValue          回调函数第一个参数value
 * @param {string}          k               当前索引index
 * @param {string}          O               当前递归的数组
 * @this  {Object}          thisArg
 */
Mhd.prototype.forEach = function(callback, thisArg) {
    var T, k
    if (this === null) {
        throw new TypeError('this is null or not defined')
    }

    // Let O be the result of calling toObject() passing the |this| value as the argument.
    // 确保this一定是一个对象类型
    var O = Object(this)

    // Let len be toUint32(lenValue).
    // 确保len 是一个32位无符号整数。该操作保证：所有非数值转换成0; 所有大于等于 0 等数取整数部分
    var len = O.length >>> 0

    // If isCallable(callback) is false, throw a TypeError exception.
    if (typeof callback !== 'function') {
        throw new TypeError(callback + 'is not a function!')
    }

    // If thisArg was supplied, let T be thisArg else let T be undefined.
    if (arguments.length > 1) {
        T = thisArg
    }

    k = 0

    while(k < len) {
        var kValue
        if (k in O) {
            kValue = O[k]
        }
        var r = callback.call(T, kValue, k, O)
        if (r === false) break
        k++
    }
}

// Mhd类的静态方法
/**
 * 浏览器-UUID生成器
 * 浏览器环境使用crypto API生成符合RFC4122版本4的UUID，该方法不适合node环境。node环境可参照：https://github.com/kelektiv/node-uuid
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/RandomSource/getRandomValues 浏览器环境crypto API:
 * @see http://nodejs.cn/api/crypto.html nodejs crypto API
 * @example
 * uuid()  // '7982fcfe-5721-4632-bede-6000885be57d'
 */
Mhd.uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))

/**
 * 给Mhd实例添加实例属性的函数
 * 写在构造函数外部，以 call 的方式调用私有方法。还可以以symbol的形式写在原型上表示私有方法
 * @param {Object} m 数组或者伪数组
 * @this Mhd实例
 */
function AddProperty(m) {
    if (typeof m !== 'object') throw new TypeError('m must be a object!')
    var len = m.length >>> 0

    this.length = len
    var i = len - 1
    while( i >= 0 ) {
        this[i] = m[i]
        i--
    }
}

/**
 * 判断传入的对象是不是数组
 * @param {Any} m 要判断对象
 * @returns true|false
 */
function isArray(m) {
    return Object.prototype.toString.call(m) === '[object Array]'
}

// Mhd模块
// 先整体导出这个类， 后续优化导出为类的实例
module.exports = Mhd
