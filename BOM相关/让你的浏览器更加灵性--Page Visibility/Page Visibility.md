# 让你的浏览器更加灵性--Page Visibility

以前访问别人的网站时，发现当页面tab切开的时候，网站的title会变化，当时没太注意这个的实现方法，后来发现了Page Visibility这个浏览器API，这篇文章简单讲下这个API的用法

## Page Visibility API

通过`Page Visibility API`可以获取到当前网页的可见状态

这个API主要作为Document的扩展接口，所以需要通过`document`对象来获取数据

### 属性

`Page Visibility API`包含两个属性`visibilityState`，`hidden`

#### visibilityState

这个属性为`string`类型，包含4个值，表示的当前文档的可见状态

|值|描述|
|:---|:---|
|visible|页面内容是可见的，实际就是浏览器非最小化窗口的激活的选项卡|
|hidden|页面不可见，实际就是浏览器最小化了或者操作系统锁屏，或者标签被切出去了
|prerender|页面正在预渲染|
|unloaded|页面正在被关闭|

#### hidden

这个属性为`boolean`类型，用于描述当前文档是否被隐藏，`true`表示当前文档被隐藏，`false`表示当前当前文档可见

这个属性其实就是在`visibilityState`为`visible`时为`true`，其他时候为`false`

### 事件

当文档的可见状态改变时，可以通过监听`visibilitychange`事件来知晓

``` javascript
function visibilityChange(){
    console.log(document.visibilityState)
}

document.addEventListener("visibilitychange", visibilityChange)
```

![](http://o7yupdhjc.bkt.clouddn.com/18-3-20/55648724.jpg)

如图可以看到切换出去和切换回来后，输出了`hidden`和`visible`

下面来个简单的标题改变的应用

## 应用

### 标题变幻

``` javascript
function visibilityChange(){
    if(document.hidden){
        document.title = "哎！别走啊"
    } else {
        document.title = "我就知道你会回来的~~"
    }
}

document.addEventListener("visibilitychange", visibilityChange)
```

![](http://o7yupdhjc.bkt.clouddn.com/18-3-20/87430499.jpg)

## 结尾

这个简单的API就这样讲的差不多了![](http://o7yupdhjc.bkt.clouddn.com/17-9-27/79506665.jpg)，除了可以改变标题让你的文档更加`灵性`，这个API还主要用在控制视频播放，Banner滚动，页面完全关闭前保存数据等等地方

## 参考资料

[W3C规范](https://www.w3.org/TR/page-visibility/)

[MDN_Page Visibility API](https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API)

[caniuse Page Visibility API ?](https://caniuse.com/#search=Visibility)

## END

>   2018-03-20    完成

>   2018-03-19    立项