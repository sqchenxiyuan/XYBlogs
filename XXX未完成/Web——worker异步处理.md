# WebWorker异步处理

HTML5的时代来到了，由于前端负责的数据处理越来越大，单单靠一个JS的单线程越来越力不从心，webWorker的出现能更好的解决该问题，这篇文章将讲述webWorker的使用。

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

#### onmessage

这个方法是在Worker的内部执行 `postMessage` 事件触发时执行，需要给onmessage赋值一个函数，并且会给该函数传递一个事件对象。传递的值通过事件对象的 `data` 属性获取。

script of html

``` javascript

let worker = new Worker('worker-postMessage.js');

worker.onmessage=function(e){
    console.log(e,e.data);
}

```

worker-postMessage.js

``` javascript

postMessage("I'm Worker");

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-16/41574675-file_1489631275255_11ff9.png)

这样我们就可以获取到内部的发出信息。

#### postMessage(aMessage, transferList)

这个方法是向Worker的内部发送消息，在这里不止是传递字符串，可以传递对象等，但是不能传递函数包含的对象。

他会对对象进行深度克隆，所以可以用来进行对象的异步的深度克隆。这一部分在下面进行详细阐述。

|参数名|参数类型|参数描述|是否必要|
|:---|:---|:---|:---
|aMessage|any|需要发送的消息，可以传递对象，会对对象（可以包含js的内置对象类型）进行深度克隆，但是不支持函数的传递|FALSE|
|transferList|array|将对象的上下文环境移交给worker|FALSE|


script of html

``` javascript

let worker = new Worker('worker-backData.js');

worker.onmessage=function(e){
    console.log(e.data);
}

worker.postMessage('123');
worker.postMessage({x:1});
worker.postMessage({x:1,y:function(){}});

```

worker-postMessage.js

``` javascript

onmessage=function(e){
    postMessage(JSON.stringify(e.data));
}

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-16/67303759-file_1489632117317_f7bc.png)

由于执行是异步的，所以还是要主线程的JS执行完毕后才能执行对事件的响应，第一个错误是因为对有函数的对象解析导致的，所以我们只能看到前面两个的字付串输出。

#### terminate()

这个函数是立刻停止worker的运行，不会等待worker的运行完成。

script of html

``` javascript

let worker = new Worker('worker-backData.js');

worker.onmessage=function(e){
    console.log(e.data);
}

worker.postMessage('123');

setTimeout(()=>{
    worker.terminate();
    worker.postMessage('223');
},1000)

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-16/60630320-file_1489632881761_1412a.png)

我们可以看到这里只有 `123` 输出，虽然依然可以向worker发送消息，但是没什么卵用。

## webWorker内部环境

worker的执行的环境和浏览器环境的有一些不同，浏览器内全局变量是 `window` 而 worker内部是[DedicatedWorkerGlobalScope](https://developer.mozilla.org/zh-CN/docs/Web/API/DedicatedWorkerGlobalScope)

在这个环境中无法使用window来获取全局变量

script of html

``` javascript

let worker = new Worker('worker-window.js');

worker.onmessage=function(e){
    console.log(e.data);
}

```

worker-window.js

``` javascript

window.postMessage('123');

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-16/38853793-file_1489634098334_b8c4.png)

我们可以看到window是没有定义的，想要获取我们需要使用 `self`

worker-self.js

``` javascript

self.postMessage('123');

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-16/86004010-file_1489634852286_ec81.png)

这样我们就可以获取内部的全局变量了，其实self在浏览器环境下也是指向全局环境的。

### 全局环境

worker的内部环境当然也和浏览器下的环境差不多，都含有相关的全局方法。

#### console

worker的内部环境也是支持console.log来方便调试的，并且它的输出会展示在浏览器的控制台当中

worker-self.js

``` javascript

console.log('console.log')
console.log('console.error')
console.info('console.info')

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-16/67870422-file_1489635585519_146f9.png)

#### 对AJAX和webSocket的支持

``` javascript

console.log(XMLHttpRequest)//function XMLHttpRequest() { [native code] }
console.log(WebSocket)//function WebSocket() { [native code] }

```

这两个对象都是支持的，所以webWorker,可以负责数据请求的收发。

#### 无法操作DOM

``` javascript

console.log(document)//error

```

worker内部是无法操作DOM的，主要是为了线程安全，但是我们在采用VDOM的时候,便可以放入worker内部处理VDOM。

## postMessage

在worker的postMessage方法，已经worker内部的postMessage都是支持对象传递的，它可以传递满足[The structured clone algorithm | 结构化克隆算法](https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm)的对象。

script of html

``` javascript

let worker = new Worker('worker-transferList.js');

let a={x:1};

let obj={x:a,y:a,z:{x:1}}

worker.postMessage(obj);

```

worker-transferList.js

``` javascript

onmessage=function(e){
    console.log(e.data.x===e.data.y);//true
    console.log(e.data.x===e.data.z);//flase
};

```

同时在深复制的时候还保持了内部的索引结构。


### transferList

最难弄清的其实是 `postMessage` 的 `transferList` 参数。

#### transferList数组类型

transferList数组类型必须为 `ArrayBuffer`, `MessagePort` and `ImageBitmap`

``` javascript

let worker = new Worker('worker-transferList.js');

let obj={x:1}

worker.onmessage=function(e){
    console.log(e.data);
}

worker.postMessage(obj,[obj]);//error: Value at index 0 does not have a transferable type.

```

我们设置成 `ArrayBuffer`


``` javascript

let worker = new Worker('worker-transferList.js');

let bufArr=new ArrayBuffer(100);

let obj={x:bufArr}

console.log(bufArr.byteLength);//100

worker.onmessage=function(e){
    console.log(e.data);
}

worker.postMessage(obj,[bufArr]);

console.log(bufArr.byteLength);//0

```

我们可以看到post成功了，但同时我们会发现bufArr.byteLength的长度改变了，因为byteLength的上下文已经搬移到worker内部了。

script of html

``` javascript

let worker = new Worker('worker-transferList.js');

let bufArr=new ArrayBuffer(100);

let obj={x:bufArr}

console.log(bufArr.byteLength);//100

worker.onmessage=function(e){
    console.log(e.data);
}

worker.postMessage(obj,[bufArr]);

console.log(bufArr.byteLength);//0

```

worker-transferList.js

``` javascript

onmessage=function(e){
    console.log('worker beforeSend',e.data.x.byteLength);
    postMessage(e.data,[e.data.x]);
    console.log('worker afterSend',e.data.x.byteLength);
};

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-16/49487941-file_1489639916878_e14e.png)


## Worker 和 SharedWorker

上述讲述的都是页面独享 `Worker` 也叫 `DedicatedWorker` ,然而还有一个 `SharedWorker`。

`DedicatedWorker` 会在页面关闭时随之关闭，而 `SharedWorker` 会在所有关联的页面都关闭后才关闭。

shared.js

``` javascript

let worker = new SharedWorker('worker-shared.js');

worker.port.start();

worker.port.postMessage('123');

worker.port.onmessage=function(e){
    console.log(e.data);
};

```

worker-shared.js

``` javascript

var x=0;

function add(){
    setTimeout(()=>{
        x++;
        add();
    },100);
}
add();

addEventListener("connect", function(e){

    var port = e.ports[0];

    port.addEventListener('message', function(e) {
      port.postMessage(x);
    });

    port.start(); //用onmessage绑定，必须要显式启动端口通信

});

```

当我们只在第一个页面进行刷新时，输出的都是0，但当有两个页面时，刷新一个页面输出的内容就不再只是0。

当只有一个页面时

![](http://o7yupdhjc.bkt.clouddn.com/17-3-16/82481994-file_1489668478929_15fb2.png)

当有两个页面时

![](http://o7yupdhjc.bkt.clouddn.com/17-3-16/82403752-file_1489668538842_b11f.png)

### 注意

1. 我也不知道为何，直接写在HTML中的sharedWorker并不会执行。

## 总结

这里 `webWorker` 简单的介绍就算完了，使用 `webWorker` 能减少页面的拥塞，充分利用客户的物理资源处理大量数据同时还可以用于封装接口层，毕竟是支持AJAX和webSocket的~~~。

## 参考资料

[MDN_Worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker/Worker)

[caniuse_Worker](http://caniuse.com/#search=Web%20Workers)

## END

> 2017-3-16 完成

> 2017-2-25 立项
