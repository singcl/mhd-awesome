## JS 动态加载脚本并执行回调
关于在`javascript`里面加载其它的js文件的问题很多人都遇到过，但很多朋友可能并不知道怎么判断我们要加载的js文件是否加载完成，如果没有加载完成我们就调用文件里面的函数是不会成功的。本文讲解怎么在js中成功加载其它js文件后再执行回调函数。

我们可以动态的创建 `<script>` 元素，然后通过更改它的` src` 属性来加载脚本，但是怎么知道这个脚本文件加载完成了呢？因为有些函数需要在脚本加载完成才能调用。IE 浏览器中可以使用 `<script>` 元素的 `onreadystatechange` 来监控加载状态的改变，并通过判断它的 `readyState` 是 `loaded` 或 `complete` 来判断脚本是否加载完成。而非 IE 浏览器可以使用 `onload` 来直接判断脚本是否加载完成。

### 动态脚本简单示例
一个**简单**的实现过程看上去是下面这样的：
```js
// IE下：
var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement
var src = 'http://xxx.com'
var script = document.createElement("script")
script.setAttribute("type","text/javascript")
script.onreadystatechange = function() {
    if(this.readyState == "loaded" || this.readyState == "complete") {
        alert("加载成功啦！")
    }
}
script.setAttribute("src", src)
HEAD.appendChild(script)
```
```js
// Opera、FF、Chrome等：
var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
var src = 'http://xxx.com'
var script = document.createElement("script")
script.setAttribute("type","text/javascript")
script.onload = function() {
    alert("加载成功啦！");
}
script.setAttribute("src",src)
HEAD.appendChild(script)
```
原理很简单，根据这两个简单的原理，我们进行一些修改，我把改成了两个函数，分别是串行加载和并行加载脚本。 

### 串行和并行动态脚本
当传一个包含多个JS文件路径的数组时，串行加载函数从第一个脚本文件加载开始，每加载成功一个便开始加载下一个脚本文件，全部加载完成后执行回调函数。而并行加载是一开始便加载全部的脚本文件，也就是他们从同一点开始加载，当全部加载完成后，执行回调函数。

**经过测试，这两个函数兼容目前的所有主流浏览器**
```js
/** 
 * 串联加载指定的脚本
 * 串联加载[异步]逐个加载，每个加载完成后加载下一个
 * 全部加载完成后执行回调
 * @param array|string 指定的脚本们
 * @param function 成功后回调的函数
 * @return array 所有生成的脚本元素对象数组
 */

function seriesLoadScripts(scripts, callback) {
    if(typeof(scripts) != "object") var scripts = [scripts];
    var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
    var s = new Array();
    var last = scripts.length - 1;
    //递归
    var recursiveLoad = function(i) {
        s[i] = document.createElement("script");
        s[i].setAttribute("type","text/javascript");
        //Attach handlers for all browsers
        s[i].onload = s[i].onreadystatechange = function() {
            if(!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                this.onload = this.onreadystatechange = null; 
                this.parentNode.removeChild(this); 
                if(i != last) {
                    recursiveLoad(i + 1);
                } else if (typeof(callback) == "function") {
                    callback()
                };
            }
        }
        s[i].setAttribute("src", scripts[i]);
        HEAD.appendChild(s[i]);
    };
    recursiveLoad(0);
}
 

/**
 * 并联加载指定的脚本
 * 并联加载[同步]同时加载，不管上个是否加载完成，直接加载全部
 * 全部加载完成后执行回调
 * @param array|string 指定的脚本们
 * @param function 成功后回调的函数
 * @return array 所有生成的脚本元素对象数组
 */ 

function parallelLoadScripts(scripts, callback) {
    if(typeof(scripts) != "object") var scripts = [scripts];
    var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
    var s = new Array();
    var loaded = 0;
    for(var i = 0; i < scripts.length; i++) {
        s[i] = document.createElement("script");
        s[i].setAttribute("type","text/javascript");
        //Attach handlers for all browsers
        s[i].onload = s[i].onreadystatechange = function() {
            if(!/*@cc_on!@*/0 || this.readyState == "loaded" || this.readyState == "complete") {
                loaded++;
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this);
                if(loaded == scripts.length && typeof(callback) == "function") callback();
            }
        };
        s[i].setAttribute("src",scripts[i]);
        HEAD.appendChild(s[i]);
    }
}
```
在这里是把 `<script>` 标签动态的插入到页面中的 `<head>` 标签内部，并且加载完成后标签元素会被自动移除。 细心的你还会发现，这里使用了一种称作条件编译的方法作为表达式（**`!/*@cc_on!@*/0`**）来判断是否非 IE 浏览器，关于条件编译并不是本文的重点，有兴趣的您可以上网查找相关资料进行学习。

### 使用方法
这两个函数的使用方法： 这里声明了一个数组变量，里面包含了两个远程的JS文件地址（当然 `<script>` 标签调用脚本是支持跨域的）：
```js
var scripts = [  
    "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js",
    "http://wellstyled.com/files/jquery.debug/jquery.debug.js"
];

// 这两个文件分别是 jQuery 1.4.的库文件和 jQuery Debug 插件
// 然后你可以使用下面的方法调用并在成功后执行回调了。

seriesLoadScripts(scripts,function() {  
   /*
   debug = new $.debug({  
       posTo : { x:'right', y:'bottom' },
       width: '480px',
       height: '50%',
       itemDivider : '<hr>',
       listDOM : 'all'
   });
   */
   alert('脚本加载完成啦');
});
```
这里使用的是串联加载的函数，当然你也可以使用并联加载函数，这可以根据情况使用，建议每下一个脚本对上一个脚本有依赖性的使用串联加载，否则使用并联，因为原理上并联要比串联快那么些。
