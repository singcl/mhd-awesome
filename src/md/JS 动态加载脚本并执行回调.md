## 问题
项目中经常会遇到这样的问题：当某个`js`脚本加载完成后再执行相应任务，但很多朋友可能并不知道怎么判断我们要加载的`js`文件是否加载完成，如果没有加载完成我们就调用`js`文件里面的函数是不会成功的。本文主要讲解怎么在成功加载`js`文件后再执行相应回调任务。

## 基本思路
我们可以动态的创建 `<script>` 元素，然后通过更改它的` src` 属性来加载脚本，但是怎么知道这个脚本文件加载完成了呢？因为有些函数需要在脚本加载完成才能调用。IE 浏览器中可以使用 `<script>` 元素的 `onreadystatechange` 来监控加载状态的改变，并通过判断它的 `readyState` 是 `loaded` 或 `complete` 来判断脚本是否加载完成。而非 IE 浏览器可以使用 `onload` 来直接判断脚本是否加载完成。

## 动态脚本简单示例
一个**简单**的实现过程如下：
```js
// IE下：
var HEAD = document.getElementsByTagName('head')[0] || document.documentElement
var src = 'http://xxxxxx.com'
var script = document.createElement('script')
script.setAttribute('type','text/javascript')
script.onreadystatechange = function() {
    if(this.readyState === 'loaded' || this.readyState === 'complete') {
        console.log('加载成功！')
    }
}
script.setAttribute('src', src)
HEAD.appendChild(script)
```
```js
// Chrome等现代浏览器：
var HEAD = document.getElementsByTagName('head')[0] || document.documentElement;
var src = 'http://xxxxxx.com'
var script = document.createElement('script')
script.setAttribute('type','text/javascript')
script.onload = function() {
    console.log('加载成功!')
}
script.setAttribute('src', src)
HEAD.appendChild(script)
```
原理很简单，根据这两个简单的原理，我们进行一些修改，我把改成了两个函数，分别是**串行加载**和**并行加载**。 
## 串行和并行动态脚本
当传一个包含多个JS文件路径的数组时，串行加载函数从第一个脚本文件加载开始，每加载成功一个便开始加载下一个脚本文件，全部加载完成后执行回调函数。而并行加载是一开始便加载全部的脚本文件，也就是他们从同一点开始加载，当全部加载完成后，执行回调函数。
```js
/** 
 * 串行加载指定的脚本
 * 串行加载[异步]逐个加载，每个加载完成后加载下一个
 * 全部加载完成后执行回调
 * @param {Array|String}  scripts 指定要加载的脚本
 * @param {Function} callback 成功后回调的函数
 * @return {Array} 所有生成的脚本元素对象数组
 */

function seriesLoadScripts(scripts, callback) {
    if(typeof(scripts) !== 'object') {
        var scripts = [scripts];
    }
    var HEAD = document.getElementsByTagName('head')[0] || document.documentElement;
    var s = [];
    var last = scripts.length - 1;
    //递归
    var recursiveLoad = function(i) {
        s[i] = document.createElement('script');
        s[i].setAttribute('type','text/javascript');
        // Attach handlers for all browsers
        // 异步
        s[i].onload = s[i].onreadystatechange = function() {
            if(!/*@cc_on!@*/0 || this.readyState === 'loaded' || this.readyState === 'complete') {
                this.onload = this.onreadystatechange = null; 
                this.parentNode.removeChild(this);
                if(i !== last) {
                    recursiveLoad(i + 1);
                } else if (typeof(callback) === 'function') {
                    callback()
                };
            }
        }
        // 同步
        s[i].setAttribute('src', scripts[i]);
        HEAD.appendChild(s[i]);
    };
    recursiveLoad(0);
}
 

/**
 * 并行加载指定的脚本
 * 并行加载[同步]同时加载，不管上个是否加载完成，直接加载全部
 * 全部加载完成后执行回调
 * @param {Array|String}  scripts 指定要加载的脚本
 * @param {Function} callback 成功后回调的函数
 * @return {Array} 所有生成的脚本元素对象数组
 */ 

function parallelLoadScripts(scripts, callback) {
    if(typeof(scripts) !== 'object') {
        var scripts = [scripts];
    }
    var HEAD = document.getElementsByTagName('head')[0] || document.documentElement;
    var s = [];
    var loaded = 0;
    for(var i = 0; i < scripts.length; i++) {
        s[i] = document.createElement('script');
        s[i].setAttribute('type','text/javascript');
        // Attach handlers for all browsers
        // 异步
        s[i].onload = s[i].onreadystatechange = function() {
            if(!/*@cc_on!@*/0 || this.readyState === 'loaded' || this.readyState === 'complete') {
                loaded++;
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this);
                if(loaded === scripts.length && typeof(callback) === 'function') callback();
            }
        };
        // 同步
        s[i].setAttribute('src',scripts[i]);
        HEAD.appendChild(s[i]);
    }
}
```
在这里是把 `<script>` 标签动态的插入到页面中的 `<head>` 标签内部，并且加载完成后标签元素会被自动移除。 细心的你还会发现，这里使用了一种称作条件编译的方法作为表达式（**`!/*@cc_on!@*/0`**）来判断是否非 IE 浏览器，关于条件编译并不是本文的重点。
## 使用方法
这里声明了一个数组变量，里面包含了两个远程的JS文件地址（当然 `<script>` 标签调用脚本是支持跨域的）：
```js
var scripts = [  
    "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js",
    "http://wellstyled.com/files/jquery.debug/jquery.debug.js"
];

// 这两个文件分别是 jQuery 1.4.的库文件和 jQuery Debug 插件
// 然后你可以使用下面的方法调用并在成功后执行回调了。

parallelLoadScripts(scripts, function() {  
   /*
   debug = new $.debug({  
       posTo : { x:'right', y:'bottom' },
       width: '480px',
       height: '50%',
       itemDivider : '<hr>',
       listDOM : 'all'
   });
   */
   console.log('脚本加载完成啦');
});
```
这里使用的是并行加载的函数，当然你也可以使用串行加载函数，这可以根据情况使用，建议每下一个脚本对上一个脚本有依赖性的使用串联加载，否则使用并联，因为原理上并联要比串联快那么些。
