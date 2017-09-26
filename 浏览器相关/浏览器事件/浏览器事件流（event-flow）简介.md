# 浏览器事件流（event-flow）简介

这篇文章将讲简单述详细浏览器DOM树的事件流（event-flow）相关的知识，主要包括事件的流程、事件的监听等。

## 简介

在web前端开发中，为了即时响应用户的操作，浏览器主要通过事件的形式来通知脚本进行响应，例如点击事件(click)，鼠标滚轮的滚动(mousewheel)，键盘的按下(keydown)等等。

对于事件的了解最基本的就是事件如何监听，事件的对象有哪些主要属性，事件的传递流程。

### 讲解用的HTML结构

``` html

<style media="screen">
    #out{
        width: 200px;
        height: 200px;
        border: 1px blue solid;
    }

    #in{
        margin: 10px;
        width: 100px;
        height: 100px;
        border: 1px red solid;
    }

</style>
<div id="out">
    <div id="in">
        <input id="btn" type="button" name="" value="an">
    </div>
</div>

```

## 事件的监听

一切的开始都是要先学会用，用都不会很难去深入理解其背后的原因。

### 原始的事件绑定

JS最原始的事件绑定是通过对DOM对象的事件属性绑定函数实现。可以通过内联的方式调用要执行的代码，或者使用JS获取DOM对象来设置事件属性。

``` html

<input id="btn" type="button" name="" value="an" click="clickFun()">

```

或

``` javascript

function clickFun(){
    console.log("button!")
}

document.getElementById("btn").onclick = clickFun

```

这样当点击id为`btn`的元素时，便会输出`button!`

这样就实现了一个事件的监听，但是这个存在一定的问题，当有多个地方需要监听相同事件时，便会冲突

``` javascript

document.getElementById("btn").onclick=function(){
    console.log("button!")
}
//something...
document.getElementById("btn").onclick=function(){
    console.log("button?")
}

```

这时点击只会输出`button?`，因为第二个绑定的函数覆盖了前一个函数。对同一个节点的监听只能同时有一个实例。

## 事件监听器(EventListener)

为了解决上面原始的监听方法的弊端，推出了事件监听器，它允许多个实例对事件进行订阅，同时可以选择在事件的哪个阶段触发监听器,而原始的绑定方法都是在只在冒泡阶段触发。

### addEventListener(type,callback,capture = false)

`addEventListener`是对元素添加事件监听器的方法。

`type`是需要监听的事件类型，`callback`是监听的回调函数，`capture`标记的监听的所处阶段，`true`为捕获阶段，`false`为冒泡阶段。

``` javascript

document.getElementById("out").addEventListener("click",function(){
    console.log("out!")
})
//something
document.getElementById("in").addEventListener("click",function(){
    console.log("in!")
})

```

现在我们点击就可以看到 `in!` 和 `out!` 一起输出了~

### removeEventListener(type, callback, capture = false)

`removeEventListener`是用于移除监听器的方法。

`type`是需要移除监听的事件类型，`callback`是使用`addEventListener`绑定时的回调函数，`capture`标记的监听的所处阶段，`true`为捕获阶段，`false`为冒泡阶段。

``` javascript

function clickout(){
    console.log("out!");
}

document.getElementById("out").addEventListener("click",clickout);
document.getElementById("out").removeEventListener("click",clickout);

document.getElementById("in").addEventListener("click",function(){
    console.log("in!")
})

```

这样将会每次点击只输出`in!`了，这里提取`clickout`出来，是为了保证添加和移除的函数是相同的，如果写成这样

``` javascript

document.getElementById("out").addEventListener("click",function(){
    console.log("out!")
})
document.getElementById("out").removeEventListener("click",function(){
    console.log("out!")
})

document.getElementById("in").addEventListener("click",function(){
    console.log("in!")
})

```

是没有用的，因为填充的是匿名函数，虽然代码执行是相同的，但是在计算机内是不同的两个对象。

### 小提示

>   1.当属性绑定和监听器绑定相同函数时，依然会触发两次
>    ``` javascript
>        function clickout(){
>            console.log("out!");
>        }
>        
>        document.getElementById("out").onclick = clickout
>        document.getElementById("out").addEventListener("click",clickout);
>        document.getElementById("out").addEventListener("click",clickout);
>    ```

## 事件对象

当我们监听一个事件后，事件触发会调用我们设置的回调函数，同时会传入一个事件对象，这个事件对象将描述触发的事件相关信息。

这里简单的讲述下最基础的事件对象所包含的一些重要信息，其他的事件对象都是基于这个对象扩展出来，包含一些其他特别信息的对象。

``` javascript

document.getElementById("out").addEventListener("click",function(event){
    console.log(event)
});

```

1.  event.bubbles

    一个布尔值，用来表示该事件是否在DOM中冒泡。比如focus，blur这些事件就不会冒泡。

2.  event.cancelBubble

    `stopPropagation()`以前的别名。通过在一个事件处理程序返回前设置这个属性的值为真，来阻止事件的传播。

3.  event.cancelable

    一个布尔值，用来表示这个时间是否可以取消。

4.  event.currentTarget

    当前注册事件的对象的引用,就是注册这个事件监听的对象,这个值会在传递的途中进行改变(因为沿途监听的对象也在变啊)。

5.  evnet.defaultPrevented

    一个布尔值，表示是否已经阻止默认行为

6.  event.eventPhase

    指示事件流正在处理哪个阶段。

7.  event.target

    对事件起源目标的引用,即哪个对象触发的事件流。

8.  event.type

    事件的名称（不区分大小写）。

## 事件流程

浏览器的事件流分为捕获(capture)，触发(target)以及冒泡(bubble)3个阶段。

![](https://www.w3.org/TR/uievents/images/eventflow.svg)

### 捕获(capture)阶段

这个阶段事件的消息会从 `window` 对象向下朝触发的元素传递。

比如这样监听：

``` javascript

window.addEventListener("click",function(e){
    console.log("window",e);
},true);

document.addEventListener("click",function(e){
    console.log("document",e);
},true);

document.body.parentElement.addEventListener("click",function(e){
    console.log("html",e);
},true);

document.body.addEventListener("click",function(e){
    console.log("body",e);
},true);

document.getElementById("out").addEventListener("click",function(e){
    console.log("out",e);
},true);

document.getElementById("in").addEventListener("click",function(e){
    console.log("in",e);
},true);

```

那么点击id为`in`的元素时，输出的结果就会按着`window` 对象到id为`in`的元素的传递顺序显示出来

![](http://o7yupdhjc.bkt.clouddn.com/17-6-14/29840401.jpg)

### 触发(target)阶段

这个阶段其实就是消息到达目标后，目标做出响应的阶段，如果这个消息是不会冒泡的，那么这个阶段以后就不会在冒泡了。

### 冒泡(bubble)阶段

这个阶段事件的消息和捕获相反，会从触发的元素向上朝 `window` 对象传递。

比如这样监听：

``` javascript

window.addEventListener("click",function(e){
    console.log("window",e);
},false);

document.addEventListener("click",function(e){
    console.log("document",e);
},false);

document.body.parentElement.addEventListener("click",function(e){
    console.log("html",e);
},false);

document.body.addEventListener("click",function(e){
    console.log("body",e);
},false);

document.getElementById("out").addEventListener("click",function(e){
    console.log("out",e);
},false);

document.getElementById("in").addEventListener("click",function(e){
    console.log("in",e);
},false);

```

结果就是这样了

![](http://o7yupdhjc.bkt.clouddn.com/17-6-14/58067840.jpg)


## 总结

1.  任何事件都有捕获和触发阶段，但是不一定有冒泡阶段

    例如 `focus`，`blur`等事件，虽然不能在冒泡阶段阶段获取消息，但是可以在捕获阶段获取消息

    ``` javascript

    document.getElementById("in").addEventListener("focus",function(e){
        console.log("in",e);
    },true);

    document.getElementById("text").addEventListener("focus",function(e){
        console.log("text",e);
    },true);

    document.getElementById("in").addEventListener("focus",function(e){
        console.log("in",e);
    },false);

    ```

    ![](http://o7yupdhjc.bkt.clouddn.com/17-6-14/39045854.jpg)

    从结果我们可以看到捕获阶段的监听是触发了的。

2.  `stopPropagation()` 函数将会直接中断整个传播流程，而不是只中断冒泡。


## 参考资料

[UI Events W3C Working Draft, 04 August 2016](https://www.w3.org/TR/uievents)

[MDN_addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

[MDN_Event](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)

## END

>   2017-9-26    更新了简单的内联调用的说明，添加了一个小提示

>   2017-6-14    完成

>   2017-5-6    立项
