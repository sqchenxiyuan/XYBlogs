# JS滚轮滚动事件封装(start,ing,end)

最近在实习中遇到了需要使用原生JS完成滚轮滚动结束事件的监听，基于原生的scroll事件我完成了scrollstart，scrollend的扩展。

---
## 源码

### ES5- 版

```javascript

function scrollExtend(obj){
    var handler=null;
    var start=obj.scrollStart;
    var scroll=obj.scrollIng;
    var end=obj.scrollEnd;
    var delay=obj.delay||200;

    return function(){
        var that = this;
        var _argumrnts = arguments;
        if(!handler&&start) start.apply(this, arguments);
        if(handler) clearTimeout(handler);
        if(scroll) scroll.apply(this, arguments);
        if(end){
            handler = setTimeout(function() {
            handler=null;
            end.apply(that, _argumrnts);
            }, delay);
        }
    };
}

```

### ES6+ 版

```javascript

function scrollExtend(options){
    let handler=null;
    let {
        scrollStart,
        scrollIng,
        scrollEnd,
        delay = 200
    } = options

    return function(){
        let _arguments = arguments
        if(!handler&&scrollStart) scrollStart.apply(this, _arguments)
        if(handler) clearTimeout(handler)
        if(scrollIng) scrollIng.apply(this, _arguments)
        if(scrollEnd){
            handler = setTimeout(()=>{
                handler = null
                scrollEnd.apply(this, _arguments)
            },delay)
        }
    };
}

```

## 用法

### 参数说明

|参数|类型|是否必传|说明|
|:--|:--|:--|:--|
|scrollStart|Funciton|否|滑动开始的时候的事件|
|scrollIng|Funciton|否|滑动中的时候的事件|
|scrollEnd|Funciton|否|滑动结束的时候的事件|
|delay|Number|否|判断滑动结束的时间延迟|


```javascript

element.addEventListener('scroll',scrollExtend({
	scrollStart:function(){
		//这里添加滑动开始的时候的事件
	},
	scrollIng:function(){
		//这里添加滑动的时候的事件
	},
	scrollEnd:function(){
		//这里添加滑动结束的时候的事件
	},
	delay://这里添加判断滑动结束的时间长 默认200ms
}));

```

[简单案例](https://github.com/sqchenxiyuan/CUI/blob/master/%E6%BB%91%E5%8A%A8%E6%9D%A1%E6%BB%9A%E5%8A%A8%E5%81%9C%E6%AD%A2%E4%BA%8B%E4%BB%B6/index.html)

### 结合VUE用法

``` html

<div @scroll="scroll($event)"></div>

```

``` javascript

new Vue({
	methods:{
		scroll:scrollExtend({
          scrollStart:function(){
            console.log('scrollstart');
          },
          scrollIng:function(){
            console.log('scrolling');
          },
          scrollEnd:function(){
            console.log('scrollend');
          },
          delay:200
        }
	}
})

```

## 超简单解析

主要就是使用settimeout()和clearTimeout()来延长时间，以及使用匿名函数的思想。

## END

>   2018-2-24   修复错误的MD语法

>   2017-9-3   允许传递事件参数

>   2017-4-12
>   +   文章改名
>   +   增加ES6语法的编写
>   +   增加参数说明

>   2017-3-20     修复直接使用this,无法传递this环境的BUG

>   2017-2-12		结合VUE，可以直接使用，同时函数内的this环境为vue对象

>   2016-10-22 	完成
