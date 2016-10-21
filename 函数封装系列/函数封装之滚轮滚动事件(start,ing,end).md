# 自定义事件系列(1)——滚轮滚动事件(start,ing,end)

最近在实习中遇到了需要使用原生JS完成滚轮滚动结束事件的监听，基于原生的scroll事件我完成了scrollstart，scrollend的扩展。

---
## 源码

```javascript

function scrollExtend(obj){
	var handler=null;
	var start=obj.scrollstart;
	var scroll=obj.scrolling;
	var end=obj.scrollend;
	var delay=obj.delay;
	return function(){
		if(!handler&&start) start();
		if(handler) clearTimeout(handler);
		if(scroll) scroll();
		if(end&&delay){
			handler=setTimeout(function(){
				handler=null;
				end();
			},delay);
		}
	};
}

```

## 用法

```javascript

element.addEventListener('scroll',scrollExtend({
	scrollstart:function(){
		//这里添加滑动开始的时候的事件
	},
	scrolling:function(){
		//这里添加滑动的时候的事件
	},
	scrollend:function(){
		//这里添加滑动结束的时候的事件
	},
	delay://这里添加判断滑动结束的时间长
}));

```

[简单案例](https://github.com/sqchenxiyuan/CUI/blob/master/%E6%BB%91%E5%8A%A8%E6%9D%A1%E6%BB%9A%E5%8A%A8%E5%81%9C%E6%AD%A2%E4%BA%8B%E4%BB%B6/index.html)

## 超简单解析

主要就是使用settimeout()和clearTimeout()来延长时间，以及使用匿名函数的思想。
