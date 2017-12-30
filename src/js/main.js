/* eslint-disable no-unused-vars */

function reverse(str) {
    return str.split('').reverse().join('');
}

function isInteger(num) {
    if (typeof num !== "number") return false;
    var pattern = /^[1-9]\d*$/g;
    return pattern.test(num);
}

// 方法二：判断对象是否为空
function isEmptyObject(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        } else {
            return true;
        }
    }
}
