# 杂项之typeof null === 'object'

前一段时间写博客，发现了 **typeof null === 'object' 结果为 TURE**！！！

## typeof

**typeof** 是一个JS的操作符，返回一个字符串,指示未经计算的操作数的类型。

### 用法

>typeof operand

operand 是一个表达式，表示对象或原始值，其类型将被返回。

### 结果列表

|类型                                        |结果|
|--:                                         |--:|
|Undefined                                   |"undefined"|
|Null	"object"                               |(见下方)|
|Boolean	                                   |"boolean"|
|Number                                      |"number"|
|String	                                     |"string"|
|Symbol(ECMAScript 6 新增)                   |"symbol"|
|宿主对象(由JS环境提供)                       |Implementation-dependent|
|函数对象 ( [[Call]] 在ECMA-262条款中实现了)	  |"function"|
|任何其他对象	                                |"object"|

### 特殊的NULL

> typeof null === 'object';

在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是0。由于 null 代表的是空指针(大多数平台下值为0x00)，因此，null的类型标签也成为了0，typeof null就错误的返回了"object"。

在ES6中有[提议](http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null)将这个问题修复，但被否决了，现在依然是 **typeof null === 'object'**。

### 注意

#### 1.typeof 的优先级高于运算

``` javascript

console.log(typeof 1+2);//number2
console.log(typeof (1+2));//number

```

## 参考资料

[MDN-typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

## END

> 2016-12-13 完成
>
> 2016-12-12 立项
