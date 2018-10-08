# MutationObserver简介

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

其中主要监听的内容为3大块：**attributes(节点属性)**,**characterData(字符数据)**,**childList(子节点的增删)**

### attributes

和`attributes`有关的属性包括`attributeFilter`, `attributeOldValue`, `attributes`三个，其中`attributes`是开关监听节点属性变换的参数

``` javascript
let attributesChangeEl = document.querySelector("#attributes-change")
let config = { attributes: true }
let observer1 = new MutationObserver(mutationsList => {
    console.log(mutationsList)
})
observer1.observe(attributesChangeEl, config)
```

尝试改变颜色的属性，可以看到输出了事件

![](http://o7yupdhjc.bkt.clouddn.com/18-10-8/12131802.jpg)

#### attributeOldValue

`attributeOldValue`可以帮助开发者获取改变前的数据

``` javascript
let attributesChangeEl = document.querySelector("#attributes-change")
let config = { attributes: true }
let observer1 = new MutationObserver(mutationsList => {
    console.log(mutationsList)
})
observer1.observe(attributesChangeEl, config)
```

![](http://o7yupdhjc.bkt.clouddn.com/18-10-8/32733921.jpg)

图中可以看到多了一个`oldValue`的属性来获取改变前的值

#### attributeFilter

`attributeFilter`可以帮助开发者只捕获特定属性的变化

``` javascript
let attributesChangeEl = document.querySelector("#attributes-change")
let config = { attributes: true, attributeOldValue: true, attributeFilter: [ "data-a"] }
let observer1 = new MutationObserver(mutationsList => {
    console.log(mutationsList)
})
observer1.observe(attributesChangeEl, config)
```

![](http://o7yupdhjc.bkt.clouddn.com/18-10-8/80304748.jpg)

上面的操作可以看到，只有修改`data-a`属性的时候才会有事件发生

### characterData

`characterData`主要用在文本节点上面，而且监听的必须是文本节点，这里使用`subtree`属性监听节点下的子文本节点来简化代码

``` javascript
let characterdataChangeEl = document.querySelector("#characterdata-change")
let config2 = { characterData: true, subtree: true }
let observer2 = new MutationObserver(mutationsList => {
    console.log(mutationsList)
})
observer2.observe(characterdataChangeEl, config2)
```

![](http://o7yupdhjc.bkt.clouddn.com/18-10-8/10917265.jpg)

上图可以看到在改变节点的内的时候有输出数据，`characterDataOldValue`的功能和`attributeOldValue`相同，这里就不做演示了

### childList

`childList`属性可以允许监听当前节点的子节点的增删变化

``` javascript
let childlistChangeEl = document.querySelector("#childlist-change")
let config3 = { childList: true }
let observer3 = new MutationObserver(mutationsList => {
    console.log(mutationsList)
})
observer3.observe(childlistChangeEl, config3)

document.querySelector("#childlist-change-btn").addEventListener("click", function(){
    childlistChangeEl.removeChild(childlistChangeEl.children[0])
    let div = document.createElement("div")
    div.innerHTML = Date.now()
    childlistChangeEl.appendChild(div)
})
```
![](http://o7yupdhjc.bkt.clouddn.com/18-10-8/84629923.jpg)

图中可以看到在修改子节点后有输出数据，添加和删除的节点分别在属性`addedNodes`和`removedNodes`里面可以获取

## 总结与注意

通过上面的内容大致对`MutationObserver`有了一定的了解了，详细还是看官方的规范以及现实面对的情况具体再去深入了解吧~~~

### 注意一

文本节点的内容变动需要直接监听文本节点，或者在父节点设置`subtree`的属性否者不会监听到


## 参考资料

[MDN_MutationObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)

## END 

>   2018-10-08   完成
> 
>   2017-09-28   立项