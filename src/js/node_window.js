"use strict"

for (let i = (setTimeout(() => console.log(i, this), 2333), 0); i < 2; i++) {}

for (
    let i = (setTimeout(function() {
        console.log(i, this)
    }, 2333),
    0);
    i < 2;
    i++
) {}

// 上面两段代码 在node和浏览器输出结果完全不一样
