```js
/*
    * 方法一：新建一个buffer来缓存remote api下载的数据，然后再用自定义的download方法下载
    * 该方法测试环境可行，正式服务器当数据大于40万条的时候会下载不完整。
    * @time 2018/03/13 by singcl modified
request(url, function(err, response, body) {
    if (err) {
        console.log('数据下载失败');
        reject(err);
        return;
    }
    var fileBuffer = new Buffer(body);
    download(req, res, next, {
        buffer: fileBuffer,
        filename: `${deviceTypeName}-${statisStart}-${statisEnd}.txt`
    });
}); */
/*
    * 方法二: 先用一个本地服务器TXT文件保存，再下载
    * 该方法不适用
    * @time 2018/03/13 by singcl modified
request(url).pipe(fs.createWriteStream('./test.txt')).on('finish', function() {
    res.download('./test.txt', `${deviceTypeName}-${statisStart}-${statisEnd}.txt`);
});
*/

/* 从buffer生成stream的方法
// Initiate the source
var bufferStream = new stream.PassThrough();
// Write your buffer
bufferStream.end(new Buffer(str));
// Pipe it to something else  (i.e. stdout)
bufferStream.pipe(res);
*/

// 方法三：Stream 方式下载
res.attachment(filename);
// stream流的pipe以及事件监听
// 这里可以多次pipe处理后再pipe到res。在pipe的过程中可以对数据可以自定义处理和重新组织 解决直接返回的不是我们想要的数据的问题
// stream.Transform 转换流了解下...
var stream =  request(url);
stream
    .on('response', function(response) {
        console.log(response.statusCode, response.headers['content-type']); // 200 // 'image/png'
        // if (response.statusCode !== 200) {
        //     reject(response.statusCode);
        // }
    })
    .on('error', function(err) {
        reject(err);
        return;
    })
    .pipe(res)
    .on('error', function(err) {
        reject(err);
        return;
    }).on('finish', function() {
        // console.log(`文件:${filename}下载完成！`);
    });
```
