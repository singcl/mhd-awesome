var Mhd = require('./Mhd')
var mhd = new Mhd([2,1,234442])
mhd.forEach((element) => {
    console.log(element)
});

// each 方法实现基本原理
// 增加了callback 如果返回false 的话就退出循环了，后面的不用在执行
function each(arr, callback) {
    if (typeof callback !== 'function') throw new TypeError('callback must be a function!')
    for (var i = 0; i < arr.length; i++) {
       var r = callback(arr[i], i, arr);
       if (r === false) {
           // 只退出循环，不退出函数
           break
           // 或者直接退出函数执行
           // return
       }
    }
}

each([3,4,5,6], function(item) {
    console.log(item)
    if (item === 3) return false
})
