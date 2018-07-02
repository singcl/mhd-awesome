```js
(async function() {
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
        },

        [Symbol.iterator]: () => {
            const items = [`s`, `i`, `n`, `g`, `c`, Promise.resolve(3)];
            return {
                next: () => ({
                    done: items.length === 0,
                    value: items.shift()
                })
            };
        }
    };
    for await (let v of justjavac) {
        console.log(v);
    }
})();
```

### 测试结果

##### 使用 for-await-of 迭代对象时：

-   概念：异步迭代接口: `[Symbol.asyncIterator]`
-   同步迭代结构`[Symbol.iterator]`
-   同步迭代对象 `iterator`
-   异步迭代对象 `asyncIterator`
-   迭代结果：`iterationResult`

1.  同步迭代对象的 next 方法返回的是 iterationResult, 异步迭代对象 next 方法返回的 Promise <iterationResult>
2.  对象同时部署异步迭代接口和同步迭代接口时优先调用异步迭代接口
3.  当没有部署异步迭代接口时，for-await-of 会调用同步迭代接口
4.  当调用同步迭代接口时，next 方法会自动把结果包装成 Promise 对象，同时如果 next 返回的对象的 value 值是 Promise,则取 Promise 的结果作为最终 value
5.  当调用异步迭代接口时，如果 next 返回的不是 Promise，会自动把结果包装成 Promise 对象，此时如果 next 返回的对象的 value 值是 Promise,则不会做任何处理
