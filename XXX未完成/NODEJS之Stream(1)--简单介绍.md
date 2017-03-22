# NODEJS之Stream(1)--简单介绍

NODEJS中有一个十分重要的数据类型，就是 Stream（流），然而晃眼一看是很难一下理解node中流的使用方法的，这篇文章将依靠node的文件流详细讲述 stream 在node中的基本使用方法。

## 可读流（Readable Streams）

数据处理当然是从它开始来的地方进来，我们这里也从读取开始。

node中一类流叫做可读流，这类流是对数据的源头所做出的抽象，它只能输出数据而不能接受数据。

### 建立文件可读流以及data事件

在node中我们可以使用 `fs.createReadStream` 快速获得一个文件的可读流。

同时通过监听 `data` 事件来获取数据。

``` javascript

let fileReadStream=fs.createReadStream('./test.txt')

fileReadStream.on('data',function(data){
    console.log(data)
})

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-22/46751467-file_1490191505659_116ec.png)

我们可以看到输出了 `BufferArray` 类型的数据,如果我们想要看到数据的字符内容我们可以在创建文档流的时候设置 `encoding`，在这里我的文档是 `utf-8` 的编码，所以我使用 `utf-8`，这个需要根据文件进行调整。

``` javascript

let fileReadStream=fs.createReadStream('./test.txt',{
    encoding:'utf-8'
})

fileReadStream.on('data',function(data){
    console.log(data)
})

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-22/68496808-file_1490191795100_11465.png)

这样我们就可以将对 `BufferArray` 的操作改为对 `String` 的了。

在 Nodejs API创建的流对象Stream中只支持对 `BufferArray` 和 `String` 的操作，在一些第三方的流中我们对其它类型进行操作，称为 `对象模式(object mode)`

### end事件和close事件

`end` 事件将在流中没有数据可供使用时触发。

`close` 事件将在流或其底层资源（比如一个文件）关闭后触发。`close` 事件触发后，该流将不会再触发任何事件。

``` javascript

let fs=require('fs');

let fileReadStream=fs.createReadStream('./test.txt',{
    encoding:'utf-8'
})

fileReadStream.on('data',function(data){
    console.log(data.length)
})

fileReadStream.on('end',function(){
    console.log('没有更多的数据啦!');
})

fileReadStream.on('close',function(){
    console.log('文件读取完毕！');
})

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-22/87062493-file_1490192544598_132a7.png)

这3个事件是十分基础和常用的，我们先暂时了解到这里，下面我们看看数据的输出流--可写流。

## 可写流(Writable Streams)

可写流和可读流相对应，它是对数据的终点所做出的抽象，它只能接受数据而不能输出数据。

### 建立文件可写流以及write方法。

## 参考资料

[NODE Stream 中文官方文档](http://nodejs.cn/api/stream.html)

## END

> 2017-3-5 立项
