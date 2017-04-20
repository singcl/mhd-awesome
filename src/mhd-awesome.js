/*
 * Author:mhd
 * Version:0.0.1
 * Date: 2016.7.13
 */
(function(window,undefined) {
    "use strict";
   
    //向window 对象注册GLOBAL命名空间
    window["NameSpace"] = window["NameSpace"] ? window["NameSpace"] : {};
    //向window.GLOBAL对象注册二级命名空间
    window["NameSpace"]["mhd"] = {};

    //函数声明 或者 使用函数表达式
    //ajax GET请求，返回XHR.responseText数据
    function ajaxGetText(url,callback) {
        //判断浏览器是否支持XMLHttpRequest对象，并赋值
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        //XHR对象的onreadystatechange事件，一共调用5次，readystate属性每改变一次调用一次
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                //回调函数，定义回调函数的三个实参
                callback(xmlhttp.responseText, xmlhttp.status, xmlhttp);
            }
        }
        //XHR对象的方法
        xmlhttp.open("GET",url, true);
        xmlhttp.send();
    }

    //向mhd二级命名空间注册ajaxGetText方法
    window["NameSpace"]["mhd"]["ajaxGetText"] = ajaxGetText;

    //自己封装一个ajax方法。不能跨域
    function ajax(options) {
        //初始化options对象
        options = options || {};
        options.type = (options.type || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data);

        //第一步：创建XHR对象
        //非IE6
        if(window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        }
        else {  //IE6及以下
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        //第三步：接受服务器返回的对象
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText,xhr.responseXML,xhr);
                }
                else {
                  options.fail && options.faild(status);
                }
            }
        }
        //第二步：连接服务器 和 发送请求
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(); 
        }else if (options.type = "POST") {
            xhr.open("POST", options.url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
        
        //函数声明data格式化函数
        function formatParams(data) {
            var arr = [];
            for (var key in data) {
                //下面对象寻址中必须使用[]来寻址，不能用.来寻址 参考
                //百度或收藏夹（重学JS） 两种寻址的不同
                arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
            }
            //在请求中加入v=xxx的字符串形式来拒绝缓存，每次都直接从服务器加载
            arr.push("v=" + Math.random().toString().replace(".",""));
            return arr.join("&");
        }
    }
    window["NameSpace"]["mhd"]["ajax"] = ajax;

    //自己封装的一个JSONP 可以跨域 也可以同域使用
    function getJSON(options) {
        options = options || {};
        if (!options.url) {    //options.url && options.jsonp的逆否命题
            throw new Error("url为必填参数!");
        }

        //创建script元素并加入页面
        //更改key:value键值对中回调函数名key，默认设为"callback" 类似$.ajax()中的用法
        //这个参数取决于服务器端设置，由服务器端给定这个参数
        var jsonp = options.jsonp || "callback";
        //更改key:value键值对中回调函数名value,默认设为一个随机生成的字符串
        var callbackName = options.jsonpCallback || ("jsonp_" + Math.random().toString().replace(".",""));
        var hHead = document.getElementsByTagName("head")[0];
        //将回调函数key:value键值对作为data对象的参数和其他data一起上传到服务器
        options.data[jsonp] = callbackName;
        var params = formatParams(options.data);
        var hScript = document.createElement("script");
        hHead.appendChild(hScript);

        //创建jsonp回调函数用于服务器端返回数据
        window[callbackName] = function(data) {
            hHead.removeChild(hScript);
            clearTimeout(hScript.timer);
            window[callbackName] = null;
            //手动删除动态创建的脚本标签上的所有属性
            for(var property in hScript) {
                delete hScript[property];
            }

            //向回调函数options.success 传递data参数
            options.success && options.success(data);    //是逻辑&& 不是逻辑||   
        }

        //发送请求 DOM script
        hScript.src = options.url + "?" + params;

        //超时处理
        if (options.time) {
            hScript.timer = setTimeout(function() {
                window[callbackName] = null;
                hHead.removeChild(hScript);
                options.fail && options.fail({message:"请求超时！"});
            },options.time);
        }

        //函数声明data格式化函数
        function formatParams(data) {
            var arr = [];
            for (var key in data) {
                arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
            }
            return arr.join("&");
        }
    }

    window["NameSpace"]["mhd"]["getJSON"] = getJSON;

    //数组去重并排序一:本地Array的新增方法。全局作用域下运行
    Array.prototype.unique = function() {
        this.sort();  //先排序，不然下面的方法无效
        var newArray = [this[0]];
        for(var i = 1; i < this.length; i++) {
            if (this[i] !== newArray[newArray.length - 1]) {  //与新数组最后一个元素比较
                newArray.push(this[i]);
            }
        }
        return newArray;
    };

    //数组去重二无排序
    function oSort(arr) {
        var result = {},
            newArray = [];
        for (var i = 0; i < arr.length; i++) {
            if (!result[arr[i]]) {
                newArray.push(arr[i]);
                result[arr[i]] = 1;
            } 
        }
        return newArray;
    }
    //向mhd二级命名空间注册oSort方法
    window["NameSpace"]["mhd"]["oSort"] = oSort;

    //数组去重三无排序
    //由于数组没有indexOf方法（有的浏览器支持）,那么我们先给数组的原型上添加该方法
    Array.prototype.indexOf = function(vItem) {
        for (var i = 0; i < this.length; i++) {
            if (vItem == this[i]) {
                return i;
            }
        }
        return -1;
    }

    function mUnique(arr) {
        var newArray = [];
        for(var i in arr) {
            //使用hasOwnProperty来过滤原型链prototype上自定义的属性和方法，详情参看for in循环
            if (newArray.indexOf(arr[i]) == -1 && arr.hasOwnProperty(i)) {
                newArray.push(arr[i]);
            }
        }
        return newArray;
    }
    window["NameSpace"]["mhd"]["mUnique"] = mUnique;
    //js冒泡法排序
    function bubbleSort(arr) {
    	var len = arr.length;
    	var temp;
    	for (var i = 0;i < len-1; i++) {
    		for(var j = 0;j< len-1-i; j++) {
    			if(arr[j] > arr[j + 1]) {
    				temp = arr[j];arr[j] = arr[j + 1];arr[j + 1] = temp;
    			}
    		}
    	}
    	return arr;
    }
    window["NameSpace"]["mhd"]["bubbleSort"] = bubbleSort;

    // 数字前加指定个数0
    function zeroStr(str,num) {
        for (var i = 0; i < num; i++) {
            str = "0" + str;
        }
        return str.substring(str.length - num, str.length);
    }
    window["NameSpace"]["mhd"]["zeroStr"] = zeroStr;
    //原生获取元素的上一个相邻兄弟元素节点，自动排出非元素节点
    function prevSibling(node) {
        var tempFirst = node.parentNode.firstNode;
        if (node == tempFirst) return null;
        var tempObj = node.previousSibling;
        while(tempObj.nodeType != 1 && tempObj.previousSibling != null) {
            tempObj = tempObj.previousSibling;
        }
        return (tempObj.nodeType == 1) ? tempObj : null;
    }

    window["NameSpace"]["mhd"]["prevSibling"] = prevSibling;

    //原生获取元素的下一个相邻兄弟元素节点，自动排出非元素节点
    function nextSibling(node) {
        var tempLast = node.parentNode.lastChild;
        if (node == tempLast) return null;
        var tempObj = node.nextSibling;
        while (tempObj.nodeType != 1 && tempObj.nextSibling != null) {
            tempObj = tempObj.nextSibling;
        }
        return (tempObj.nodeType==1)? tempObj:null;
    }

    window["NameSpace"]["mhd"]["nextSibling"] = nextSibling;

    //原生获取元素的子元素节点，自动排出非元素节点.和children方法一样的功能
    function children(node) {
       var tempObj = node.childNodes;
       var newTempObj = [];
       for (var i = 0; i < tempObj.length; i++) {
            if (tempObj[i].nodeType != 1) continue;
            newTempObj.push(tempObj[i]);
       } 
       return newTempObj;
    }

    window["NameSpace"]["mhd"]["children"] = children;

    //返回非行间样式
    function getStyle(obj,attr) {
    	//IE兼容
        if(obj.currentStyle) {
            return obj.currentStyle[attr];
        }
        //非IE
        else {
        	return window.getComputedStyle(obj,null)[attr];
        	//如果用getPropertyValue()则attr不支持驼峰法，直接就是CSS写法
            //return window.getComputedStyle(obj,null).getPropertyValue(attr);
        }
    }

    window["NameSpace"]["mhd"]["getStyle"] = getStyle;

    /*
    @mhd:将一个字符串重复自身的N次
    */
    //版本1：利用空数组的join方法
    function repeatOne(target,n) {
        return (new Array(n+1).join(target));
    }
    window["NameSpace"]["mhd"]["repeatOne"] = repeatOne;

    //版本2：之所以要创建一个带length属性的对象，是因为要调用数据的原型方法，需要指定call的第一个参数为类数组对象
    //类数组对象的必要条件是length属性值为非负数？？？？不太懂
    function repeatTwo(target,n) {
        return Array.prototype.join.call(
            {length:n+1},target
        );
    }
    window["NameSpace"]["mhd"]["repeatTwo"] = repeatTwo;

    //版本3：利用闭包将类数组对象于数组原型的join方法缓存起来
    var repeatThree = (function() {
        var join = Array.prototype.join,obj = {};
        return function(target,n) {
            obj.length = n + 1;
            return join.call(obj,target);
        }
    })();
    window["NameSpace"]["mhd"]["repeatThree"] = repeatThree;

    //版本4：使用二分法
    function repeatFour(target,n) {
        var s = target, total = [];
        while(n > 0) {
            if (n % 2 ==1) {
                total[total.length] = s //如果是奇数
            }
            if (n == 1) {
                break;
            }
            s += s;
            n = n >> 1; //右移一位相当于除2取商，右移n位相当于除以2的n次方。
        }
        return total.join("");
    }
    window["NameSpace"]["mhd"]["repeatFour"] = repeatFour;

    //版本5：版本4的改良版 (此方法效率最高)
    function repeatFive(target,n) {
        var s = target, total = "";
        while(n > 0) {
            if (n % 2 == 1) {
                total += s;
            }
            if (n == 1) {
                break;
            }
            s += s;
            n = n >> 1;//相当于将n除以2取其商，或者说是开2次方
        }
        return total;
    }
    window["NameSpace"]["mhd"]["repeatFive"] = repeatFive;

    //版本6：反例
    function repeatSix(target, n) {
        return (n <= 0)? "":target.concat(repeat(target,--n));
    }
    window["NameSpace"]["mhd"]["repeatSix"] = repeatSix;
    //其他剩下的2种方法请百度http://www.tuicool.com/articles/y6neiu
    
    function trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g,"");
    }
    window["NameSpace"]["mhd"]["trim"] = trim;

    function ltrim(str) {
        return str.replace(/(^\s*)/g,"");
    }
    window["NameSpace"]["mhd"]["ltrim"] = ltrim;

    function rtrim(str) {
        return str.replace(/(\s*$)/g,"");
    }
    window["NameSpace"]["mhd"]["rtrim"] = rtrim;

    //js闭包实现函数的柯里化，无限累加为例
    function add () {
        var args = Array.prototype.slice.call(arguments);
        var fn = function() {
            var args_fn = Array.prototype.slice.call(arguments);
            return add.apply(null, args.concat(args_fn));
        };

        fn.valueOf = function() {
            return args.reduce(function(previousValue, currentValue) {
                return previousValue + currentValue;
            })
        };

        return fn;
    }
    window["NameSpace"]["mhd"]["add"] = add;

    //方法一：判断对象是否为空 
    function isEmptyObject(obj) {
    	for (var key in obj) {
    		return false;
    	} 
    	return true;
    }

     window["NameSpace"]["mhd"]["isEmptyObject"] = isEmptyObject;

    //方法二：判断对象是否为空
    function isNullObject(obj) {
    	for (var key in obj) {
    		if (obj.hasOwnProperty(key)) {
    			return false;
    		} else {
    			return true;
    		}
    	}
    }

    window["NameSpace"]["mhd"]["isNullObject"] = isNullObject;

})(window);

