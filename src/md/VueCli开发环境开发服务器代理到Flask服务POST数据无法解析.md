# VueCli 开发环境开发服务器代理到 Flask 服务 POST 数据无法解析

## 问题

今天同事遇到一个问题：

他用[VUE-ADMIN-TEMPLATE](https://github.com/PanJiaChen/vue-admin-template/blob/master/package.json)创建一个前端项目，
后端则是一个 FLASK 项目。前端使用 fetch 发起一个 POST 请求，设置`Content-Type: application/json`, 后端能够收到请求，但是在解析数据的时候就没有响应了。

奇怪的时候通过 POSTMAN 或者直接 nodejs 发起请求，Flask 又可以正常解析。！！

后端代码

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/post-test', methods=['POST'])
def post_test():
    try:
        # 在这里下面的代码就无响应了，打印没有反应
        print(request.form)
        print(request.data)

        #
        data = request.get_json()
        #
        # 做一些处理...
        print(data)
        # 返回响应数据
        response = {'message': '数据接收成功'}
        return jsonify(response)
    except Exception as e:
        print(str(e))
        response = {'message': '数据接收失败'}
        return jsonify(response), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
```

前端代码

```js
//
fetch("/api/test", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: '{"name": "boll", "age": 23}',
});
// 或者
fetch("/api/test", {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "name=boll&age=23",
});
```

`vue.config.js`中已经配置好了代理服务器，前端的请求也成功代理到了 flask 服务器。

## 解决

修改`Content-Type`。

改为：`"Content-Type": "application/json; charset=utf8",`,

`"Content-Type": "application/x-www-form-urlencoded; charset-utf8",`

增加`charset-utf8`,这样 Flask 服务器就能正常解析表单数据和 JSON 数据了。

## 想法

猜测通过 http-proxy-middleware 代理前端请求的时候哪里出了问题。 不知道vue-cli @5.x会不会也有这一个问题。
