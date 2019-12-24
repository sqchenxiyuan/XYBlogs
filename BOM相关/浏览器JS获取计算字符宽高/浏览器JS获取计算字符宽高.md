# 浏览器JS获取计算字符宽高

在开发中遇到了需要获取一段文字的长度的技术性需求，这篇文章将会讲述我是如何解决这样的问题的

## 浏览器环境下

### 解决方法一： SPAN标签

我最开始的解决方法是创建一个`span`元素，然后`innerHTML`设置文本在设置好样式后插入到`body`中，读取宽高

``` javascript
function getCharSize(char, style = {}){
    let {
        fontSize = "12px",
        fontFamily = "SimSun"
    } = style

    let span = document.createElement("span")
    span.style.font = `${fontSize} ${fontSize}`
    span.style.lineHeight = fontSize
    span.innerHTML = str
    document.body.appendChild(span)
    let rect = span.getBoundingClientRect()
    let width = rect.width
    let height = rect.height
    document.body.removeChild(span)
    return {
        width,
        height
    }
}
```

![](https://blog-cdn.chenxiyuan.fun/18-3-24/93782047.jpg)

#### 问题

1.  不同浏览器的差异

    不同浏览器获取的高度宽高有一些差别
        
    chrome:

    ![](https://blog-cdn.chenxiyuan.fun/18-3-24/44366378.jpg)

    firefox:

    ![](https://blog-cdn.chenxiyuan.fun/18-3-24/80572571.jpg)

    不知道为何`firefox`的高总是比`chrome`高2px，但这个我们可以通过直接获取传入的`fontSize`作为高，这样就可以统一了

    ``` javascript
    function getCharSize(char, style = {}){
        let {
            fontSize = 14,
            fontFamily = "SimSun"
        } = style
        /*其他操作*/
        return {
            width,
            height: fontSize
        }
    }
    ```

    ![](https://blog-cdn.chenxiyuan.fun/18-3-24/87422142.jpg)

2.  浏览器对字体大小的限制

    chrome默认最小字体为12px，基本是人尽皆知的

    ![](https://blog-cdn.chenxiyuan.fun/18-3-24/59748520.jpg)

    这里可以使用scale的方式实现

    ``` javascript
    function getCharSize(char, style = {}){
        let {
            fontSize = 14,
            fontFamily = "SimSun"
        } = style
        
        /*其他操作*/
        let scale = fontSize / 20
        span.style.fontSize = `${20}px`
        span.style.transform = `scale(${scale})`
        span.style.display = "inline-block" //让scale生效
        /*其他操作*/
        return {
            width,
            height: fontSize
        }
    }
    ```

    ![](https://blog-cdn.chenxiyuan.fun/18-3-26/82274935.jpg)

#### 优点

兼容几乎所有浏览器

#### 缺点

1.  会受一些潜在的全局样式影响

    ![](https://blog-cdn.chenxiyuan.fun/18-3-24/29555299.jpg)

### 解决方法二：Canvas measureText函数

除了使用span来获取浏览器表现的大小这样直接的方式以外，还有可以通过使用canvasAPI的[CanvasRenderingContext2D.measureText()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/measureText)方式来快速获取

``` javascript
const ctx = document.createElement('canvas').getContext('2d')
function getCharSizeByCanvas(char, style = {}){
    let {
        fontSize = 14,
        fontFamily = "SimSun"
    } = style
    
    ctx.font = `${fontSize}px ${fontFamily}`
    let text = ctx.measureText(char)
    let result = {
        height: fontSize,
        width: text.width
    }

    return result
}
```

#### 问题

1.  chrome浏览器存在BUG，如果canvas不在DOM树上设置字体大小小于12px时，字体大小会强制设置为12px

    ``` javascript

    //setfont before append
    const canvas1 = document.createElement('canvas')
    canvas1.width = 100
    canvas1.height = 100
    const ctx1 = canvas1.getContext('2d')
    ctx1.font = "8px Arial"
    ctx1.fillText(ctx1.font, 0, 50)
    document.body.appendChild(canvas1)

    //set font after append
    const canvas2 = document.createElement('canvas')
    canvas2.width = 100
    canvas2.height = 100
    const ctx2 = canvas2.getContext('2d')
    document.body.appendChild(canvas2)
    ctx2.font = "8px Arial"
    ctx2.fillText(ctx2.font, 0, 50)

    ```

    ![](https://blog-cdn.chenxiyuan.fun/18-3-31/89113489.jpg)

## 代码整理

下面给出优化后的代码

### 方法一：span

``` javascript
let span = document.createElement("span")
span.style.positon = "ablsolute"

function getCharSize(char, style = {}){
    let {
        fontSize = 14,
        fontFamily = "SimSun"
    } = style
    
    let scale = fontSize / 20
    span.style.fontSize = "20px"
    span.style.fontFamily = fontFamily
    span.style.lineHeight = "0"
    span.style.transform = `scale(${scale})`
    span.style.display = "inline-block"
    span.innerHTML = char
    document.body.appendChild(span)
    let rect = span.getBoundingClientRect()
    let width = rect.width
    document.body.removeChild(span)
    return {
        width,
        height: fontSize
    }
}
```

### 方法二：canvas计算

``` javascript
let canvas = document.createElement('canvas')
canvas.style.positon = "ablsolute"
let ctx = canvas.getContext('2d')

function getCharSizeByCanvas(char, style = {}){
    let {
        fontSize = 14,
        fontFamily = "Arial"
    } = style
    document.body.appendChild(canvas)
    ctx.font = `${fontSize}px ${fontFamily}`
    document.body.removeChild(canvas)
    let text = ctx.measureText(char) // TextMetrics object
    ctx.fillText(char, 50, 50)
    let result = {
        height: fontSize,
        width: text.width
    }
    return result
}
```

## 性能比较

数据为进行10000次单字符计算

1.  都需要插入DOM的情况下(方法二兼容chrome，且字体都为12px以下)

    ![](https://blog-cdn.chenxiyuan.fun/18-3-31/30782320.jpg) ![](https://blog-cdn.chenxiyuan.fun/18-3-31/80601993.jpg) ![](https://blog-cdn.chenxiyuan.fun/18-3-31/55948947.jpg)

    方法二效率比方法一快: 150%左右

2.  方法二字体都为12px以上

    ![](https://blog-cdn.chenxiyuan.fun/18-3-31/42526653.jpg) ![](https://blog-cdn.chenxiyuan.fun/18-3-31/33213498.jpg) ![](https://blog-cdn.chenxiyuan.fun/18-3-31/82711810.jpg)

    方法二效率比方法一快: 1500%左右

从效率上来讲，canvas效率是极高的，同时canvas还有还在制定的标准，可以提供更加详细的文本信息，chrome只需要去`chrome://flags/`开启`Experimental Extension APIs`（新版本）或`Experimental Extension APIs`（老版本）就可以提前使用该功能

![](https://blog-cdn.chenxiyuan.fun/18-3-31/41988249.jpg)

## 参考资料

[CanvasRenderingContext2D.measureText()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/measureText)

[TextMetrics](https://developer.mozilla.org/zh-CN/docs/Web/API/TextMetrics)

## END

>   2019-01-15  更新:谷歌浏览器开启flag的实验特性有改变(Experimental Extension APIs)

>   2018-03-31  完成

>   2017-12-13  立项