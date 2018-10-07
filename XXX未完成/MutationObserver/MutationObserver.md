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

使用MutationObserver需要3个参数，一个是用于接收事件的回调函数`callback`，一个是需要监听的节点`targetNode`，还有一个是监听的配置`MutationObserverInit`

`observe`是用来进行监听的函数，同时还有`disconnect`函数用来阻止监听

`callback`以及`targetNode`都很好理解，下面主要介绍`MutationObserverInit`的详细内容，同时会伴随介绍不同配置下的响应内容

## MutationObserverInit

`MutationObserverInit`是描述的这次监听的内容的配置对象主要包含下面几个属性

|属性名|属性类型|默认值|属性描述|
|---|---|---|---|
|attributeFilter|Array<String>|null|需要监听的属性的列表，为空就是监听全部|
|attributeOldValue|Boolean|false|是否记录改变前的旧值|
|attributes|Boolean|false|是否监听元素属性变化|
|characterData|Boolean|false|是否监听`characterData`内容的变化，主要涉及`Text`, `ProcessingInstruction`, and `Comment`相关的接口。|
|characterDataOldValue|Boolean|false|是否记录`characterData`内容的旧值|
|childList|Boolean|false|是否监听节点的子节点的添加删除操作|
|subtree|Boolean|false|是否监听子树相关变化|

其中主要监听的内容为3大块：**attributes(节点属性)**,**childList(子节点的增删)**,**characterData(字符数据)**


## 参考资料

[MDN_MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

## END 

>   2017-9-28   立项