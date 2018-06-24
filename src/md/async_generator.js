var fs = require("fs");
// 运行环境: Nodejs 10.x
// for-await-of 必须存在于异步函数中,在异步函数外使用会报错

///////////////////// 传统的流的读取方法/////////////////////////////////
/* const stream = fs.createReadStream(filepath, {
    encoding: 'utf8',  // null -> buffers, 'utf8' -> strings with that encoding
    highWaterMark: 1024 // maximum size of each chunk (buffer or string)
});
stream.on('data', chunk => {
    console.log(`Read: ${chunk}`);
});
stream.on('end', () => {
    console.log('EOF');
}); */
/////////////////////////////////////////////////////////////////

// 创建一个可读流
// Node 10.x ExperimentalWarning: Readable[Symbol.asyncIterator]
// @see https://zaiste.net/nodejs_10_asynchronous_iteration_async_generators/
const stream = fs.createReadStream("./beego_hello.go", {
    encoding: "utf8", // null -> buffers, 'utf8' -> strings with that encoding
    highWaterMark: 1024 // maximum size of each chunk (buffer or string)
});

// for await of 迭代 异步可迭代对象(asyncIterable)
(async function() {
    for await (const chunk of stream) {
        console.log(`Read: ${chunk}`);
    }
    console.log("EOF");
})();

// 异步生成器函数 返回一个异步生成器 asyncIterator
async function* fromLinesToNumberedLines(lines) {
    let counter = 1;
    for await (const line of lines) {
        yield `${counter}: ${line}`;
        counter++;
    }
}

// 1. 手动调用异步生成器对象的next方法，返回Promise<IterationResult>
fromLinesToNumberedLines(fs.createReadStream("./fibonacci.js"))
    .next()
    .then(r => {
        console.log(r);
    });

// 2. fow await of 自动迭代 异步可迭代对象
(async function() {
    for await (let v of fromLinesToNumberedLines(
        fs.createReadStream("./app.js")
    )) {
        console.log("自动迭代：", v);
    }
})();

// 3. 不是使用for await of 自动迭代， 自己写一个递归函数遍历
// @see https://babeljs.io/docs/en/babel-plugin-transform-async-generator-functions
// 定义个异步生成器函数
async function* genAnswers() {
    var stream = [Promise.resolve(4), Promise.resolve(9), Promise.resolve(12)];
    var total = 0;
    for await (let val of stream) {
        total += await val;
        yield total;
    }
}

// 定义一个递归遍历生成器对象的函数
// 貌似是一个尾递归
function forEach(asyncIterator, callback) {
    return asyncIterator.next().then(r => {
        if (!r.done) {
            callback(r);
            return forEach(asyncIterator, callback);
        }
        return "Hello, Singcl";
    });
}

var output = 0;
forEach(genAnswers(), function(v) {
    output += v.value;
}).then(v => {
    console.log(v, ",The result output is ", output);
});

// 示例2：@link: https://segmentfault.com/a/1190000013387616
const justjavac = {
    [Symbol.asyncIterator]: () => {
        const items = [`j`, `u`, `s`, `t`, `j`, `a`, `v`, `a`, `c`];
        return {
            next: () =>
                Promise.resolve({
                    done: items.length === 0,
                    value: items.shift()
                })
        };
    }
};

(async function() {
    for await (const item of justjavac) {
        console.log(item);
    }
})();
