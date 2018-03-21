#### 从buffer生成stream

```js
// Initiate the source
var bufferStream = new stream.PassThrough();
// Write your buffer
bufferStream.end(new Buffer(str));
// Pipe it to something else  (i.e. stdout)
bufferStream.pipe(res);
```
