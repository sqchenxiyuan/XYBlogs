# webWorker异步处理

HTML5的时代来到了，由于前端负责的数据处理越来越大，单单靠一个JS的单线程越来越力不从心，这篇文章将讲述webWorker的使用。

## 简单的实例

使用webWorker我们可以将一些大量计算的事情放置在另一个线程进行处理，这时候我们页面不会被卡死，让网页使用流畅。

比如我们进行一个50亿次的加法计算。

``` javascript

console.time('启动页面');

function add5billion(){
    var x=0;
    for(var i=0;i<1000000000;i++){
        x++;
        x++;
        x++;
        x++;
        x++;
    }
    return x;
}
add5billion();


console.timeEnd('启动页面');//启动页面: 2884.2ms

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-15/14669432-file_1489563686513_ba97.png)

在我的电脑上是2秒多，但一般的电脑可能要慢很多，但是作为页面展示如果需要2秒的时间那么用户体验将是相当不好的,因为两秒种的时间用户都无法操作。

这时候一般只能使用 `setTimeout` 将计算拆除，或者请求服务器处理，但是都很麻烦，在这里我们使用 `Worker` 就可以了。

script of html

``` javascript

console.time('启动页面');

var worker=new Worker('worker-5x10^9.js');//50亿加法计算的函数文件

worker.onmessage=function(e){
    console.log(e.data);
}

console.timeEnd('启动页面');//启动页面: 0.196ms

```

worker-5x10^9.js

``` javascript

var x=0;
for(var i=0;i<1000000000;i++){
    x++;
    x++;
    x++;
    x++;
    x++;
}
this.postMessage(x);

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-15/18765655-file_1489563927596_1184.png)

![](http://o7yupdhjc.bkt.clouddn.com/17-3-15/41123916-file_1489563299699_11414.png)

使用webWorker可以避免大量的计算导致的拥塞，避免页面假死，充分利用客户端的物理资源。

下面我们来详细讲述如何使用 `webWorker`。

## Worker简介

### 兼容性

虽然作为HTM5的新特性，但是各大浏览器对 `webWorker` 的支持都是很好的,所以我们基本可以大胆的尝试在工程中使用。

![](http://o7yupdhjc.bkt.clouddn.com/17-3-15/32230454-file_1489570747547_c5a1.png)

### 构造函数

`webWorker` 在浏览器中的构造函数为 `Worker()`


但是必须传入一个字符串参数作为 `webWorker` 运行的内容，在上面的示例中便是传入了 `worker-5x10^9.js` 来让其执行。

#### 语法

>   new Worker(aURL);

#### 参数

|参数名|参数类型|参数描述|是否必要|
|:---|:---|:---|:---
|aURL|String|webWorker运行脚本的地址，它必须遵循同源策略|TRUE|

#### 用法

``` javascript

var worker = new Worker(workerURL);

```

### 实例API

我们可以看看输出worker实例对象。

![](http://o7yupdhjc.bkt.clouddn.com/17-3-15/76665581-file_1489572232506_103c0.png)

我们可以看到它主要包含4个方法：

1.  onerror
2.  onmessage
3.  postMessage
4.  terminate

十分简单

#### onerror

这个方法是在Worker的error事件触发时执行，需要给onerror赋值一个函数，并且会给该函数传递一个事件对象。

script of html

``` javascript

let worker = new Worker('worker-error.js');

worker.onerror=function(e){
    console.log('错误对象',e);
}

```

worker-error.js

``` javascript

a=b;

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-15/91004190-file_1489588908863_45ce.png)

这样我们就可以获取到内部的错误信息，并加以处理，但是一般对这方面的需求很少，主要获取内部运行的情况。

#### onmessage()





#### postMessage()

#### terminate()


## 参考资料

[MDN_Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker)

[caniuse_Worker](http://caniuse.com/#search=Web%20Workers)

## END

> 2017-2-25 立项
