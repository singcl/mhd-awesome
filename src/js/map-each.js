// Array原型上map和forEach方法基本原理
/*eslint-disable no-unused-vars*/
function each(arr, callback) {
    for (var i = 0; i < arr.length; i++) {
        callback && callback(arr[i], i, arr);
    }
}

function map(arr, callback) {
    let list = [];
    for (var i = 0; i < arr.length; i++) {
        list.push(callback && callback(arr[i], i, arr));
    }
    return list;
}
