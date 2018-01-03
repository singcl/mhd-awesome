/* eslint-disable no-unused-vars */

/**
 * 单词首字母大写函数
 * @param {String} str 字符串参数
 */
function upperFirstLetter(str = '') {
    if (typeof str !== 'string') return '参数必须为字符串!';
    return str.replace(/\b\w+\b/g, function(word) {
        return word.substring(0,1).toUpperCase()+word.substring(1);}
    );
}

module.exports = { upperFirstLetter }
