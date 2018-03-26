# JS计算字符宽高

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

![](http://o7yupdhjc.bkt.clouddn.com/18-3-24/93782047.jpg)

#### 问题

1.  不同浏览器的差异

    不同浏览器获取的高度宽高有一些差别
        
    chrome:

    ![](http://o7yupdhjc.bkt.clouddn.com/18-3-24/44366378.jpg)

    firefox:

    ![](http://o7yupdhjc.bkt.clouddn.com/18-3-24/80572571.jpg)

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

    ![](http://o7yupdhjc.bkt.clouddn.com/18-3-24/87422142.jpg)

2.  浏览器对字体大小的限制

    chrome默认最小字体为12px，基本是人尽皆知的

    ![](http://o7yupdhjc.bkt.clouddn.com/18-3-24/59748520.jpg)

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

    ![](http://o7yupdhjc.bkt.clouddn.com/18-3-26/82274935.jpg)

#### 优点

兼容几乎所有浏览器

#### 缺点

1.  会受一些潜在的全局样式影响

    ![](http://o7yupdhjc.bkt.clouddn.com/18-3-24/29555299.jpg)

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

## 参考资料

[CanvasRenderingContext2D.measureText()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/measureText)

## END

>   2017-12-13   立项