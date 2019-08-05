// 生成简单的字母数字组合字符串
// 相关原理： @see https://www.cnblogs.com/rosesmall/p/9473126.html
// @see https://segmentfault.com/a/1190000019826036
// 位运算只对整数起作用，如果一个运算子不是整数，会自动转为整数后再运行。
//虽然在 JavaScript 内部，数值都是以64位浮点数的形式储存，但是做位运算的时候，是以32位带符号的整数进行运算的，并且返回值也是一个32位带符号的整数。
//
export default n =>
    (((1 + Math.random()) * Number(`0x${10 ** n}`)) | 0)
        .toString(16)
        .substring(1)
