# JS监控DOM大小的变化

由于浏览器原生不自带DOM元素的resize事件，一直想弄一个JS监控DOM元素大小变化的功能，之前想过很多方法都各有优缺点，但是最近发现了一个很不错的方法，虽然以前有设想过但一直没有时间去实现，知道看到有人实现了和我的设想相同的一种比较优良的监听方法，这篇文章将主要讲述两种监听方法，以及优劣分析
## DOM大小的变化的诱因

### DOM大小的决定因素

在寻找如何监听DOM大小变化的解决办法之前，这里先列举DOM元素宽高的数值的情况：

1.  自己设置的固定宽高，如样式设置`style="width:100px;height:100px"`
2.  由上层元素决定，如样式设置`style="width:50%;height:50%"`
3.  有下层元素决定，内容撑大

宽高各自独立，可以混合出现

### DOM大小改变的原因

知道了决定的DOM大小的因素的3种情况，可以很快的列出大部分导致DOM大小变化的情况：

1.  元素修改自己的宽高样式

    元素修改自己的宽高属性，是最简单最直接也是最常见的DOM大小变化的情况

2.  当元素大小由上层元素(包括窗口大小)决定，上层元素大小发生变动时
3.  当袁术大小由下层元素决定，下层元素大小发生变动时

上面三种是最常见也是最容易想到的，仔细思考还存在其他情况

4.  元素的class的内容改变

    当元素的class的内容的宽高变化时，元素是不能监听到class内容变化的，虽然这个操作很不好，但是在切换页面皮肤时确实可能存在这样的问题

5.  过渡/动画

    当元素设置了过渡/动画效果时，元素的宽高是可能在每一帧的出现变化的

这些因素也是最难以监听和获取的可以叫"隐式变化"，之前3个比较简单的变化由于可以在节点树上和style上明显看出变化，可以简单叫"显式变化"

**显式变化**可以通过`MutationObserver`监听来达到事件流驱动节约性能的效果，但是**隐式变化**也是同样需要检测出来的，下面将列举两个检测办法，都各自有优缺点

## 解决办法

### 循环比对

最最简单直接有效的方法当然是每一帧去计算和比对需要监听的DOM的大小是否发生改变

<iframe height='265' scrolling='no' title='loop-listen' src='//codepen.io/sqchenxiyuan/embed/wYEqmZ/?height=265&theme-id=0&default-tab=html,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sqchenxiyuan/pen/wYEqmZ/'>loop-listen</a> by sqchenxiyuan (<a href='https://codepen.io/sqchenxiyuan'>@sqchenxiyuan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

这个方法很简单，也能很快的思考出来，但是这个方法很多文章或者人都认为有很大的性能消耗，其实这个方法的性能消耗在现在的计算机性能下是很小的，相较于每次DOM大小变化导致的重绘消耗的性能，占比很小

#### 覆盖情况

100%，所有元素都可以这样监听

#### 性能分析

展示性能分析前，先先说下测试展示用的机器的配置，CPU是interl i7-4790k，GPU为GTX960

前6秒为禁止状态，后6秒为改动大小的状态

##### 100节点监听

![](https://blog-cdn.chenxiyuan.fun/18-10-23/36185990.jpg)

在前6秒里，可以看到以js的执行为主(毕竟没有重绘的需求),一直在执行dom大小的变化检测，但占据的性能并不是很多，大约1%。

![](https://blog-cdn.chenxiyuan.fun/18-10-23/23570392.jpg)

在后4秒里，由于出现了dom的大小变化，页面还是执行渲染，在这段时间JS(这里JS只执行循环对比)的消耗比例很低，大约2.5%(在正常监听的时候会有一些操作，比例是会明显增大的)，反而是渲染会占据近乎2倍的消耗

![](https://blog-cdn.chenxiyuan.fun/18-10-23/76348288.jpg)

##### 其他数量的节点的测试数据

|节点数|静态总时间|静态JS耗时|动态总时间|动态JS耗时|
|---|---|---|---|---|---|---|
|100|5990ms|84.3ms(1.40%)|4020ms|111.1ms(2.76%)|
|500|5928ms|204.2ms(3.44%)|4760ms|209.7ms(4.41%)|
|1000|6007ms|342.9ms(5.71%)|5125ms|342ms(6.67%)|
|2000|6580ms|654ms(9.94%)|7955ms|1094.9ms(13.76%)|
|5000|7667ms|1880.6ms(24.53%)|6277ms|823.3ms(13.11%)|

根据上面的表可以看到静态和动态的时间大体是跟着监听的DOM节点的数量成正比的，动态消耗的时间比静态略多可能是由于对多一层调用的堆栈导致，在5000节点的时候，动态渲染消耗的时间反而少了，是由于5000节点同时改变大小，消耗了大量的资源进行重绘，这时候的帧数也开始明显降低

![](https://blog-cdn.chenxiyuan.fun/18-10-23/91304588.jpg)

这个图可以看到资源几乎被完全利用了,而且大部分是渲染消耗的

#### 小结

这个方法可以覆盖全部的变动情况，而且可以监听所有的DOM对象，但是在监听的节点数量很多的情况下(500+)的时候，消耗的性能就很多了，在这之前的消耗还是在可接受的范围内(<5%)的，而且一般实际上是没有这么多需要监听的节点的~~~，一般都在100节点以内，性能消耗是在1%内的，是一个完全满足需求的方案，没必要为了一个几乎不会遇到的需求而放弃这个简单有效的方案

接下来介绍一下，一个基于事件实现的监听方案

### DOM滚动事件驱动方案

这个方案是通过监听DOM元素的`scroll`事件来进行的，在大家可以在[这篇文章](https://blog.crimx.com/2017/07/15/element-onresize/)了解下详情，这里只简单介绍下原理

#### scroll事件发生的原理

当一个元素的`scrollLeft`或`scrollTop`属性发生改变的时候，这个元素就会触发`scroll`事件，`scroll`事件是不会冒泡的

#### 父元素大小变化时内部元素的对scrollLeft和scrollTop的影响

当父元素大小变化时，内部的元素（内容）在一定条件下会影响`scrollLeft`和`scrollTop`的值，从而触发scroll函数，下面都以高度为例(宽度其实相同)

##### 父元素变大

在一般情况下父元素变大是不会影响内容的

![](https://blog-cdn.chenxiyuan.fun/18-10-23/53804540.jpg)

但是当父元素变大的幅度超过了剩余的内容，那么内容会跟着底部向下移动，导致`scrollTop`缩小

![](https://blog-cdn.chenxiyuan.fun/18-10-23/87010949.jpg)

这样我们就能监听到`scroll`事件啦！

<iframe height='265' scrolling='no' title='通过scroll监听DOM变大' src='//codepen.io/sqchenxiyuan/embed/gBdKjp/?height=265&theme-id=0&default-tab=html,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sqchenxiyuan/pen/gBdKjp/'>通过scroll监听DOM变大</a> by sqchenxiyuan (<a href='https://codepen.io/sqchenxiyuan'>@sqchenxiyuan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

![](https://blog-cdn.chenxiyuan.fun/18-10-23/2970352.jpg)

##### 父元素变小

放大了的原理理解了话，那么放小来看下

![](https://blog-cdn.chenxiyuan.fun/18-10-23/29354667.jpg)

如果是父元素变小，如果内容的大小不变，那么`scrollTop`永远都不会发生变化，为了让其发生变化，这里需要让子元素能跟着父元素变化，而且必须变化幅度大于父元素，才能促使父元素由于超过展示范围，去改变`scrollTop`

![](https://blog-cdn.chenxiyuan.fun/18-10-23/33102416.jpg)

当内容的高度是父元素的100%以上时，由于速度比父元素缩小的块，导致父元素必须修改`scrollTop`来达到允许的最大的`scrollTop`，通过这个原理我们就可以监听到父元素的缩小啦！！！

在代码中最好使用200%及其以上，因为在浏览器中DOM的宽高都是整数的，如果是用200%一下会导致收缩不明显，而会漏掉一部分

<iframe height='265' scrolling='no' title='通过scroll监听DOM的缩小' src='//codepen.io/sqchenxiyuan/embed/mzGjqR/?height=265&theme-id=0&default-tab=html,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sqchenxiyuan/pen/mzGjqR/'>通过scroll监听DOM的缩小</a> by sqchenxiyuan (<a href='https://codepen.io/sqchenxiyuan'>@sqchenxiyuan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

![](https://blog-cdn.chenxiyuan.fun/18-10-23/69546766.jpg)

##### 放大放小混合

上面两种方法都只能实现一直情况，但是只要混合一下就能实现同时监听放大缩小了，一方变动的同时需要恢复`scrollTop`来让另一方也能跟上

<iframe height='297' scrolling='no' title='通过Scroll监听元素大小变化' src='//codepen.io/sqchenxiyuan/embed/GYXXoQ/?height=297&theme-id=0&default-tab=html,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/sqchenxiyuan/pen/GYXXoQ/'>通过Scroll监听元素大小变化</a> by sqchenxiyuan (<a href='https://codepen.io/sqchenxiyuan'>@sqchenxiyuan</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

![](https://blog-cdn.chenxiyuan.fun/18-10-23/72595702.jpg)

#### 性能分析

这个相较于`循环比对`方法要复杂的多，但是节约了DOM没有变动时(大部分情况)的计算性能，使用事件驱动是必然性能优化很多的

#### 小结

这个方法虽然很好的解决了`循环比对`的性能问题，但是会污染使用者的DOM树结构(添加了额外的东西)，而且必须要求DOM能够在下面插入节点，文本(TextNode)、图片(ImageElement)等等这些元素就么法了,同时需要父元素是一个相对元素，不然就不能模拟捕捉父元素的宽高,限制条件还是很多的

## 封装源码

### 循环监听

``` javascript
class DomResizeWatcher{
    constructor(){
        this.datas = new Map()

        this._init()
    }

    _init(){
        this._check()
    }

    _check(){
        Array.from(this.datas.values()).forEach(data => {
            data.check()
        })

        requestAnimationFrame(this._check.bind(this))
    }

    addResizeEventListener(dom, fun){
        let data = this.datas.get(dom)
        if(!data){
            data = new DomResizeWatcherData(dom)
            this.datas.set(dom, data)
        }
        data.addResizeEventListener(fun)
    }

    removeResizeEventListener(dom, fun){
        let data = this.datas.get(dom)
        if(!data) return

        data.removeResizeEventListener(fun)

        if(data.getFunCount() > 0) return

        this.datas.delete(dom)
    }
}

class DomResizeWatcherData{
    constructor(dom){
        this.dom = dom
        this.funs = new Set()
        this.size = this._getDomSize()
    }

    _getDomSize(){
        let height = this.dom.clientHeight
        let width = this.dom.clientWidth

        return {
            height,
            width
        }
    }

    _trigger(){
        let dom = this.dom
        this.funs.forEach(fun => {
            fun.apply(dom)
        })
    }

    getFunCount(){
        return this.funs.size
    }

    addResizeEventListener(fun){
        this.funs.add(fun)
    }

    removeResizeEventListener(fun){
        this.funs.delete(fun)
    }

    check(){
        let size = this._getDomSize()
        if(size.height !== this.size.height 
            || size.width !== this.size.width){
            this._trigger()
            this.size = size
        }
    }
}
```

### scroll事件驱动

``` javascript
class FrameCounter{
    constructor(){
        this.time = 0
        this._run = false
    }

    _runFun(){
        if(this._run){
            this.time++
            requestAnimationFrame(this._runFun.bind(this))
        }
    }

    start(){
        this._run = true
        this._runFun()
    }

    stop(){
        this._run = false
    }
}

class DOMResizeWatcher{
    constructor(){
        this.datas = new Map()
        this.timer = new FrameCounter()
        this.timer.start()
    }

    addResizeEventListener(dom, fun){
        let data = this.datas.get(dom)
        if(!data){
            data = new DOMResizeWatcherData(dom, this.timer)
            this.datas.set(dom, data)
        }
        data.addResizeEventListener(fun)
    }

    removeResizeEventListener(dom, fun){
        let data = this.datas.get(dom)
        if(!data) return
        
        if(fun){
            data.removeResizeEventListener(fun)

            if(data.getFunCount() > 0) return
        }

        data.destory()
        this.datas.delete(dom)
    }
}

class DOMResizeWatcherData{

    constructor(dom, timer){
        this.dom = dom
        this.funs = new Set()
        this.trigged = false
        this.timer = timer

        this.insideBigEl = null
        this.insideSmallEl = null

        this._init()
    }

    _init(){
        //监听变大的DOM
        let insideBig = document.createElement("div")
        insideBig.style = "position: absolute;top:0;left: 0;bottom: 0;right: 0;overflow: hidden;visibility: hidden;z-index:-1"
        insideBig.innerHTML = `<div style="width:${DOMResizeWatcherData.bigNumber}px;height:${DOMResizeWatcherData.bigNumber}px"></div>`

        //监听变小的DOM
        let insideSmall = document.createElement("div")
        insideSmall.style = "position: absolute;top:0;left: 0;bottom: 0;right: 0;overflow: hidden;visibility: hidden;z-index:-1"
        insideSmall.innerHTML = `<div style="width:300%;height:300%"></div>`

        this.insideBigEl = insideBig
        this.insideSmallEl = insideSmall

        try{
            this.dom.appendChild(insideBig)
            this.dom.appendChild(insideSmall)
        } catch(e) {
            throw new Error("DOMElement can't appendChild! try another way!")
        }
        
        insideSmall.scrollTop = DOMResizeWatcherData.bigNumber
        insideSmall.scrollLeft = DOMResizeWatcherData.bigNumber
        insideBig.scrollTop = DOMResizeWatcherData.bigNumber
        insideBig.scrollLeft = DOMResizeWatcherData.bigNumber

        insideBig.addEventListener("scroll", _ => {
            insideSmall.scrollTop = DOMResizeWatcherData.bigNumber
            insideSmall.scrollLeft = DOMResizeWatcherData.bigNumber
            this._trigger()
        })
        insideSmall.addEventListener("scroll", _ => {
            insideBig.scrollTop = DOMResizeWatcherData.bigNumber
            insideBig.scrollLeft = DOMResizeWatcherData.bigNumber
            this._trigger()
        })
    }

    _trigger(){
        if(this.triggertime === this.timer.time) return
        this.triggertime = this.timer.time
        
        let dom = this.dom
        this.funs.forEach(fun => {
            fun.apply(dom)
        })
    }

    getFunCount(){
        return this.funs.size
    }

    addResizeEventListener(fun){
        this.funs.add(fun)
    }

    removeResizeEventListener(fun){
        this.funs.delete(fun)
    }

    destory(){
        try{
            this.dom.removeChild(this.insideBigEl)
            this.dom.removeChild(this.insideSmallEl)
        } catch(e){}
    }
}
DOMResizeWatcherData.bigNumber = 9999999
```

## 参考资料

[scrolling官方规范](https://www.w3.org/TR/cssom-view-1/#scrolling)

[巧妙监测元素尺寸变化](https://blog.crimx.com/2017/07/15/element-onresize/)

## END

>   2018-10-23   完成
> 
>   2018-10-17   立项