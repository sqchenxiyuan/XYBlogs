# JS中toString和toLocalString的区别

简单讲述JS中toString和toLocalString的区别

## 简单的讲解

`toString` 方法和 `toLocalString` 方法在web的一些对象上都包含有，但一直都是很模糊的，都是将对象内容按照一定的规则转变为一个字符串。而 `toString` 和 `toLocalString` 的区别便主要是内部转换方式的区别。

`toString` 方法采用的是规定好的默认的转换方式，在不同的电脑上得到的结果是相同的，利于进行编程处理。

`toLocalString` 方法会根据电脑本机的配置进行转换，在不同的电脑上得到的结果是不同的，利于内容的展示。

其中比较典型的对象便是 `Date` 对象。

### Date

`Date` 的 `toString` 方法总是返回的一个标准的时间字符串，

而 `toLocalString` 方法则会根据电脑的配置时间改变格式。

``` javascript

let date = new Date();
console.log(date.toString());//Sun Apr 09 2017 13:27:49 GMT+0800 (中国标准时间)
console.log(date.toLocaleString());//2017-04-09 13:27:49

```

当我将系统的语言配置切换为英语（美国后）

![](http://o7yupdhjc.bkt.clouddn.com/17-4-9/89141664-file_1491717122749_cb5a.png)

``` javascript

let date = new Date();
console.log(date.toString());//Sun Apr 09 2017 13:27:49 GMT+0800 (中国标准时间)
console.log(date.toLocaleString());//2017-04-09 13:27:49

console.log(date.toString());//Sun Apr 09 2017 13:47:11 GMT+0800 (China Standard Time)
console.log(date.toLocaleString());//4/9/2017, 1:47:11 PM

```

可以看到输出的 `toLocaleString()` 内容格式就变了，而 `toString()` 除了后面括号内的描述改变了，其他的格式是统一的。

这样我们就对 `toString()` 和 `toLocaleString()` 的区别的理解就更加的直观了。


##  END

>   2017-4-9  完成

>   2017-2-19 立项
