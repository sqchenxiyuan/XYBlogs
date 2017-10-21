# JS创建文件并请求下载到本地

平时开发中，下载资源都是通过后台提供URL的方式下载一些内容，然而当页面作为一个应用有时需要提供下载页面生成的数据的功能，这篇文章将简单介绍JS如何实现本地生成文件并下载的功能

## 下载功能的实现

想要通过JS直接触发数据的下载目前是没有方法的，最好的办法便是使用`<a>`标签来实现下载

### download属性

`<a>`标签的`download`属性会指示浏览器下载URL而不是导航到URL,比如`<a href="http://www.baidu.com" download="baidu"></a>`将会提示下载访问`http://www.baidu.com`得到的数据

![](http://o7yupdhjc.bkt.clouddn.com/17-10-21/89343725.jpg)

所以我们只需要构建一个`<a>`标签设置属性，并触发它就行了

``` javascript
let a = document.createElement('a')
a.download = "..."
a.href = "..."
a.click()
```

---

那么如何下载JS运行中生成的数据呢？

在`<a>`标签的`href`属性上不只可以填写相关的锚点、跳转链接，还可以填写`blob: URLs` 和 `data: URLs`的内容，来运行用户下载JS生成的数据

## Blob

`Blob`对象表示不可变的类似文件对象的原始数据。`File`的接口正式基于`Blob`实现的，通过构建`Blob`然后输出`Blob`对象的`DataURL`就可以下载JS中的内容了

### new Blob(array[, options])

`Blob`的构建函数第一个参数必传，是一个由`ArrayBuffer`, `ArrayBufferView`, `Blob`, `DOMString` 等对象构成的数组，或者其他类似对象的混合体，它将会被放进`Blob`。`DOMStrings`会被编码为`UTF-8`。

第二个参数为Blob对象的配置对象，有主要的一个属性

1.  type，默认为`""`，它代表了将会被放入到blob中的数组内容的MIME类型，在下载文件时，如果文件名忽略了后缀，那么下载将会按照该属性的MIME类型给予默认后缀

``` javascript
let data = "this is a test"
let blob = new Blob([data])
```

这样我们就构建了一个Blob对象，接下来只需要获取`Blob`的`DataURL`就可以了

``` javascript
let dataURL = URL.createObjectURL(blob)
```

然后结合上面`<a>`标签下载数据的方式，我们就可以下载啦

![](http://o7yupdhjc.bkt.clouddn.com/17-9-27/79506665.jpg)

### 整体流程

``` javascript
let data = "this is a test"
let blob = new Blob([data])
let dataURL = URL.createObjectURL(blob)
let a = document.createElement('a')
a.download = "xxx"
a.href = dataURL
a.click()
```

### 小贴士

1.  通过`Blob`的type控制自动补全后缀

    ``` javascript
        URL.createObjectURL(blob,{type: "image/png"})
    ```
    
    ![](http://o7yupdhjc.bkt.clouddn.com/17-10-21/46165593.jpg)


## 参考资料

[MDN_a](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a)

[MDN_blob](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

## END

> 2017-10-21 完成

> 2017-10-20 立项
