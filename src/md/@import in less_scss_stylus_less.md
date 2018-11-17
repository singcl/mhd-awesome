```js
<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```js

```
<style lang="css">
/* @import in CSS: */
/*
1. url为绝对路径 按绝对路径导入
2. url为相对路径 按相对路径导入
3. url既不是绝对路径也不是相对路径 从node_modules中按模块导入
4. ~ 在CSS中无效
5. 后缀名.css不可省略
*/
@import "normalize.css";

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>

<style lang="scss">
/* @import in stylus/less/scss: */
/*
1. url为绝对路径 按绝对路径导入
2. url为相对路径 按相对路径导入
3. url既不是绝对路径也不是相对路径按相对路径处理
4. ~ 后面的内容被解析为模块。
  1）在node_modules找相应模块
  2）如果在node_modules中找不到,就在webpack.base.conf.js中resolve配置的alias当作模块在其中解析
  @see: https://segmentfault.com/q/1010000010541142
  @see: https://vue-loader.vuejs.org/zh/guide/asset-url.html#%E8%BD%AC%E6%8D%A2%E8%A7%84%E5%88%99
  @see: https://www.npmjs.com/package/less-loader
5. 后缀名.less/scss/styl可以省略
*/
@import "~bootstrap/scss/bootstrap.scss";
</style>

<style lang="stylus">
@import "~common/stylus/border-1px/index.styl"
</style>

```
