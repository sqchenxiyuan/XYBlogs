# 懒加载利器-IntersectionObserver简介

在开发当中，某些情况下需要监控元素是否进入了指定位置，再进行数据加载操作（例如图片的懒加载、效果的初入播放等等），传统的方式主要以监听scroll事件为主，但是这样的方式对性能有一定的影响，现在出了一个草案提出了IntersectionObserver对象，这个对象可以帮助获取两个对象之间相交时的事件，而不需要通过计时、监听事件的方式进行处理

## IntersectionObserver

简单例子

![](http://blog-cdn.chenxiyuan.fun/2019-7-12/139ee627-0cef-4106-a6f3-1ada6e276551.gif)

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>IntersectionObserver</title>
</head>
<body>
    <div style="height: 500px;width: 200px;overflow:scroll">
        <div style="position: relative; height: 2000px">
            <div id="red" style="position: absolute; top: 1000px; height: 200px; width: 100%; background: red;"></div>
        </div>
    </div>
    <script>
        let intersectionObserver = new IntersectionObserver(entries => {
            let entry = entries[0]
            if(entry.isIntersecting === true) {
                console.log("red in")
            } else {
                console.log("red out")
            }
        })
        intersectionObserver.observe(document.getElementById("red"))
    </script>
</body>
</html>
```

### 构造函数 IntersectionObserver(callback[, options])

IntersectionObserver的构造函数含有两个参数:`callback`和`options`

#### callback: (entries, observer) => void

第一个参数为触发的回调函数,`entries`是`IntersectionObserverEntry`对象数组，`observer`是触发的`IntersectionObserver`观察者实例

回调的触发是收集的这段时间内触发阈值变化的内容,一个观察对象在这一次内跨过多个阈值只能产生一个`entry`,多个观察对象跨越阈值则会产生多个`entry`

![](http://blog-cdn.chenxiyuan.fun/2019-7-12/20244429-96e5-4b97-b7ed-abb04affe5a9.gif)

#### options

配置主要包含三个属性：`root`、`rootMargin`、`threshold`

其中`root`设定的为监听对象的具体祖先元素(必须是观察对象的祖先元素，否则无效)，这个默认为顶级文档的视图窗口

`rootMargin`可以用于扩展或搜索`root`的判断区域，例如`"-30px -30px -30px -30px"`表示判断的边框向内收缩`30px`

![](http://blog-cdn.chenxiyuan.fun/2019-7-12/280d25f0-d5dc-4105-a685-e82bf29cdf78.gif)

`threshold`表示的触发的阈值，这个可以是一个数值，也可以是一个数值数组，但是值必须在`0~1`，触发时获取的比例不一定是触发的阈值

这三个选项也是`IntersectionObserver`的属性，但是是只读的

### 实例函数

在创建了`IntersectionObserver`对象后，它有`observer(targetElement)`，`unobserver(targetElement)`和`disconnect()`，其中`observer(targetElement)`，`unobserver(targetElement)`用于绑定和解绑监听对象，`disconnect()`用于结束对象的监听行为

## IntersectionObserverEntry

`IntersectionObserverEntry`对象，描述了目标元素与其根元素容器在某一特定过渡时刻的交叉状态，属性如下

|属性名称|类型|描述
|---|---|---|
|boundingClientRect|DOMRectReadOnly|目标元素的边界信息|
|rootBounds|DOMRectReadOnly|观察者的根元素的边界信息|
|intersectionRect|DOMRectReadOnly|根和目标元素的相交区域的边界信息|
|intersectionRatio|number|intersectionRect与boundingClientRect的比例值|
|isIntersecting|boolean|根和目标元素是否相交|
|target|Element|触发这个Entry的被观察元素|
|time|DOMHighResTimeStamp|IntersectionObserver的时间原点到交叉被触发的时间的时间戳|

### 兼容性

![](http://blog-cdn.chenxiyuan.fun/2019-7-12/f36f63be-482b-41de-ad2d-54d722a02080.png)

## 总结

`IntersectionObserver`主要用于监听子元素与祖先元素视图之间的交叉情况，从而实现对元素展现情况的捕获

### 注意点

1.`intersectionRatio`为0不代表不想交，是否相交需要依靠`isIntersecting`进行判断

## 参考资料

[MDN_IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver/IntersectionObserver)

## END

>   2019-07-12  完成
> 
>   2019-01-17  立项