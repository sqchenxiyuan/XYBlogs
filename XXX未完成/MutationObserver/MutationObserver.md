# MutationObserver

在某些情况下需要监听DOM元素的属性变化，而这些变化不会触发原生事件，难以监听就很尴尬，为了解决这样的情况退推出了`MutationObserver
`这个WebApi来解决问题，下面就来介绍如何使用它

## MutationObserver的使用

下面是基础的示例

``` javascript
let targetNode = document.querySelector("#targetNode")
let config = { attributes: true, childList: true, subtree: true, characterData: true }
let observer = new MutationObserver(mutationsList => console.log(mutationsList))
observer.observe(targetNode, config)
```

![](http://o7yupdhjc.bkt.clouddn.com/18-10-7/83559465.jpg)

可以看到在添加了一个节点后有输出

使用MutationObserver需要3个参数，一个是用于接收事件的回调函数`callback`，一个是需要监听的节点`targetNode`，还有一个是监听的配置`MutationObserverInit
`，`callback`以及`targetNode`都很好理解，下面主要介绍`MutationObserverInit
`的详细内容，同时会伴随介绍不同配置下的响应内容

## MutationObserverInit

`MutationObserverInit`是描述的这次监听的内容

## 参考资料

[MDN_MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

## END 

>   2017-9-28   立项