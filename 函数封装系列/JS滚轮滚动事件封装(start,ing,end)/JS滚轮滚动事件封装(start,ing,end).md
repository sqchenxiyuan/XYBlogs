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

  function scrollend(){
      handler=null;
      end.call(this);
  }

  return function(){
      if(!handler&&start) start.call(this);
      if(handler) clearTimeout(handler);
      if(scroll) scroll.call(this);
      if(end){
          handler=setTimeout(scrollend.bind(this),delay);
      }
  };
}

```

### ES6+ 版

```javascript

function scrollExtend({
    scrollStart,
    scrollIng,
    scrollEnd,
    delay = 200
}){
  let handler=null;

  return function(){
      if(!handler&&scrollStart) scrollStart.call(this);
      if(handler) clearTimeout(handler);
      if(scroll) scrollIng.call(this);
      if(scrollEnd){
          handler=setTimeout(()=>{
              handler=null;
              scrollEnd.call(this);
          },delay);
      }
  };
}

```

## 用法

### 参数说明

|参数|类型|是否必传|说明|
|:--|:--|:--|
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

> 2017-4-12     
>   +   文章改名
>   +   增加ES6语法的编写
>   +   增加参数说明

> 2017-3-20     修复直接使用this,无法传递this环境的BUG

> 2017-2-12		结合VUE，可以直接使用，同时函数内的this环境为vue对象

> 2016-10-22 	完成
