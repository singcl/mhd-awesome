// UUID生成器
// 浏览器环境使用crypto API生成符合RFC4122版本4的UUID，该方法不适合node环境。node环境可参照：https://github.com/kelektiv/node-uuid
// 浏览器环境crypto API: https://developer.mozilla.org/zh-CN/docs/Web/API/RandomSource/getRandomValues
// nodejs crypto API：http://nodejs.cn/api/crypto.html

const uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
uuid()  // '7982fcfe-5721-4632-bede-6000885be57d'
