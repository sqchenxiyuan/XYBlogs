# Nodejs之Stream(1)--简单介绍 可读流和可写流

NODEJS中有一个十分重要的数据类型，就是 Stream（流），然而晃眼一看是很难一下理解node中流的使用方法的，这篇文章将依靠node的文件流简单的讲述 stream 在的可写流和可读流，在node中的基本使用方法。

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

### 建立文件可写流以及write方法

在node中我们可以使用 `fs.createWriteStream` 方法获取一个文件可写流来将数据写入文件当中。

``` javascript

let fileWriteStream=fs.createWriteStream(path.resolve(__dirname,'./test-out.txt'));

fileWriteStream.write('这是输出数据！');

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-24/33445419-file_1490357570561_c2e0.png)

使用 `write` 方法可以将数据写入到流当中，将数据交给可写流处理。

## 可读流的pipe()

`pipe()` 方法是将可读流的数据接到可写流上，实现流数据的自动传递，这样即使是可读流较快，目标可写流也不会超负荷（overwhelmed），可以减少一些对数据负荷处理的代码编写。

``` javascript

let fileReadStream=fs.createReadStream(path.resolve(__dirname,'./test.txt'));
let fileWriteStream=fs.createWriteStream(path.resolve(__dirname,'./test-out.txt'));

fileReadStream.pipe(fileWriteStream,{ end: false });

fileReadStream.on('end',function(){
    fileWriteStream.end('这是输出数据！')
});

```

![](http://o7yupdhjc.bkt.clouddn.com/17-3-24/43328047-file_1490358531646_f942.png)

我们可以在可读流和可写流中加入一些其他的数据处理流来完成一些操作，比如：压缩文件

![](http://o7yupdhjc.bkt.clouddn.com/17-3-24/71207022-file_1490358971871_12bae.png)

![](http://o7yupdhjc.bkt.clouddn.com/17-3-24/55348980-file_1490358998658_f82d.png)

## 后记

这篇文章就大概讲述到这里了，以前的文章都是一口气写了很多，以至于每篇都讲述的过于全面而导致内容很片面，从今以后的文章将会慢慢采用分解的方式讲述，由浅入深，这样我也学习的更加深入，所能写出的文章内容也更加深刻。

这篇文章只是简单的讲述了Steam的可读流和可写流，如果想要了解的更加详细，还是建议去API看看，下一篇文章将讲述双向流，即同时实现了可读流和可写流的Stream(Duplex 流与 Transform 流)。

## 参考资料

[NODE Stream 中文官方文档](http://nodejs.cn/api/stream.html)

## END

> 2017-3-24 完成

> 2017-3-5 立项
