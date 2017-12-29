/* eslint-disable no-unused-vars */

function reverse(str) {
    return str.split('').reverse().join('');
}

function isInteger(num) {
    if (typeof num !== "number") return false;
    var pattern = /^[1-9]\d*$/g;
    return pattern.test(num);
}
