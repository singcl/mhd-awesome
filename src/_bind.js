
/**
 * bind方法的简单实现一
 * @param {*} ctx 要绑定的上下文
 * @param {*} args 绑定时传入的参数
 */
Function.prototype._bind = function(ctx, ...args) {
    return (...oArgs) => {
        this.apply(ctx, args.concat(oArgs))
    };
};

/**
 * bind方法的简单实现二
 * @param {*} ctx 要绑定的上下文
 */
Function.prototype._bind = function(ctx) {
    var args = Array.prototype.slice.call(arguments, 1);
    var that = this;
    return function() {
        that.apply(ctx, args.concat(Array.prototype.slice.call(arguments)));
    };
};

/**
 * bind方法的简单实现三， MDN polyfill实现
 * @param {*} oThis 要绑定的上下文
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError(
                "Function.prototype.bind - what is trying to be bound is not callable"
            );
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function() {},
            fBound = function() {
                return fToBind.apply(
                    this instanceof fNOP ? this : oThis,
                    // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
                    aArgs.concat(Array.prototype.slice.call(arguments))
                );
            };

        // 维护原型关系
        if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();

        return fBound;
    };
}
