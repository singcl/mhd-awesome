// 'use strict'

function isPositiveInteger(n) {
    return /^[0-9]*[1-9][0-9]*$/.test(n)
}

// 生成器函数方案
function* fibonacci() {
    let [pre, curr] = [0, 1]
    for(;;) {
        // "never" 禁止在语句末尾使用分号 (除了消除以 [、(、/、+ 或 - 开始的语句的歧义)
        yield pre; // 这里分号是必须的，或者写在下一行开始。分号自动插入规则(ASI)参考: http://eslint.cn/docs/rules/semi
        [pre, curr] = [curr, pre + curr]
    }
}

const gen = fibonacci()
for (let n of gen) {
    if (n > 1000) break
    // console.log(n)
}

// 方案一： 以上函数使用递归的方式进行斐波那契数列求和，但效率十分低，很多值会重复求值。
function fibonacci1(n) {
    if (!isPositiveInteger(n)) return '参数必须为大于0的整数！'
    return n <= 2 ? n - 1 : fibonacci1(n - 1) + fibonacci1(n -2);
}

// 方案二：
// memoization方案在《JavaScript模式》和《JavaScript设计模式》都有提到。memoization是一种将函数执行结果用变量缓存起来的方法。
// 当函数进行计算之前，先看缓存对象中是否有次计算结果，如果有，就直接从缓存对象中获取结果；如果没有，就进行计算，并将结果保存到缓存对象中。
let fibonacci2 = (function() {
    // const memoization = []
    // 这里使用对象来存储执行效率要高一点
    // 例如我们调用fibonacci(100)，这时候，fibonacci函数在第一次计算的时候会设置memory[100]=xxx，此时数组长度为101，而前面100项会初始化为undefined。
    const memoization = {}
    return function(n) {
        if (!isPositiveInteger(n)) return '参数必须为大于0的整数！'
        if (memoization[n] !== undefined) return memoization[n]
        return memoization[n] = (n === 1 || n === 2) ? n - 1 : fibonacci2(n - 1) + fibonacci2(n - 2)
    }
})()

// 方案三
// 相比上一个方案缓存更加高效，一次计算可以缓存三个值
let fibonacci3 = (function() {
    // const memoization = []
    // 这里使用对象来存储执行效率要高一点
    // 例如我们调用fibonacci(100)，这时候，fibonacci函数在第一次计算的时候会设置memory[100]=xxx，此时数组长度为101，而前面100项会初始化为undefined。
    const memoization = {}
    return function(n) {
        if (!isPositiveInteger(n)) return '参数必须为大于0的整数！'
        if(n === 1 || n === 2) {
            return n - 1
        }

        if(memoization[n - 2] === undefined) {
            memoization[n - 2] = fibonacci(n - 2)
        }

        if(memoization[n - 1] === undefined) {
            memoization[n - 1] = fibonacci(n - 1)
        }
        return memoization[n] = memoization[n - 1] + memoization[n - 2]
    }
})()

// 方案4
// 斐波那契数列求和除了可以用递归的方法解决，还可以用动态规划的方法解决
// 效率更高，不需要缓存那么多值，内存占用更少
function fibonacci4(n) {
    if (!isPositiveInteger(n)) return '参数必须为大于0的整数！'

    let n1 = 0;
    let n2 = 1;
    let sum = 1;

    if(n === 1 || n === 2) {
        return n - 1
    }

    for(let i = 3; i <= n; i++) {
        sum = n1 + n2
        n1 = n2
        n2 = sum
    }

    return sum
}

// 方案5 解构赋值
// 为什么这里解构赋值的效率还不如上面？
function fibonacci5(n) {
    if (!isPositiveInteger(n)) return '参数必须为大于0的整数！'

    let a = 0;
    let b = 1;
    let i = 1;
    while(i++ < n) {
        [a, b] = [b, a + b];
    }
    return a;
}

// 方案6：尾调用优化！！！
function fibonacci6(n, n1, n2) {
    if (!isPositiveInteger(n)) return '参数必须为大于0的整数！'
    if(n <= 1) {
        return n2
    }
    return fibonacci6(n - 1, n2, n1 + n2)
}


console.log(fibonacci6(1, 0, 1))

// f(5, 1, 1)
// f(4, 1, 2)
// f(3, 2, 3)
// f(2, 3, 5)
// f(1, 5, 8)

function speed(callback, str, ...args) {
    console.time(str)
    callback(...args)
    console.timeEnd(str)
}

speed(fibonacci2, 'fibonacci2', 10000 )
speed(fibonacci3, 'fibonacci3', 10000 )
speed(fibonacci4, 'fibonacci4', 10000 )
speed(fibonacci5, 'fibonacci5', 10000 )
speed(fibonacci6, 'fibonacci6', 10000, 0 , 1 )
