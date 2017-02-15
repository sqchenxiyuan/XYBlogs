# JS详解之数组Array的方法总结

数组这一数据结构在任何编程语言中都是十分重要的，不同的编程语言都会有一些数组的方法或者类，来方便使用者进行操作，这篇文章就主要介绍在JavaScript当中数组的一些方法。
这篇文章结合[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)完成。

## ES5-

这一部分讲述在ES5及其以下版本JS所规定的函数。[支持ES5的浏览器看这里](http://caniuse.com/#search=ECMAScript%205)

### [Array.isArray()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

#### 介绍

在JS中我们是不能使用 `typeof` 来区分数组和对象，因为 `typeof [] === 'object'` 而 **Array.isArray()** 函数可以帮助我们来判断这个对象是否为数组。

#### 语法

> Array.isArray(obj)

#### 参数

|参数名|参数描述|
|:---|:---|
|obj|需要检测的对象|

#### 返回

返回Boolean值，如果对象为数组则返回 `true` ,否则返回 `false`

#### 案例

``` JavaScript

let str="string";
let num=123;
let obj={};
let bool=true;
let array=[];

console.log(Array.isArray(str));//false
console.log(Array.isArray(num));//false
console.log(Array.isArray(obj));//false
console.log(Array.isArray(bool));//false
console.log(Array.isArray(array));//true

```

#### 注意

> isArray() 函数只有在Array对象上才能使用，因为该函数不在数组对象的原型链上，所以普通的数组对象会报错。

``` JavaScript

[].isArray([]);//error [].isArray is not a function

```

## ES6+

这一部分讲述在ES6及其以后版本JS所规定的函数。[ES6的特性支持表看这里](http://kangax.github.io/compat-table/es6/)

### [Array.from()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

#### 介绍

待写

#### 语法

> Array.from(arrayLike[, mapFn[, thisArg]])

#### 参数

|参数名|参数描述|
|:---|:---|
|arrayLike|想要转换成真实数组的类数组对象或可遍历对象。|
|mapFn|可选参数，如果指定了该参数，则最后生成的数组会经过该函数的加工处理后再返回。|
|thisArg|可选参数，执行 mapFn 函数时 this 的值。|






## list

### [Array.of()]()
### [Array.prototype.concat()]()
### [Array.prototype.copyWithin()]()
### [Array.prototype.entries()]()
### [Array.prototype.every()]()
### [Array.prototype.fill()]()
### [Array.prototype.filter()]()
### [Array.prototype.find()]()
### [Array.prototype.findIndex()]()
### [Array.prototype.forEach()]()
### [Array.prototype.includes()]()
### [Array.prototype.indexOf()]()
### [Array.prototype.join()]()
### [Array.prototype.keys()]()
### [Array.prototype.lastIndexOf()]()
### [Array.prototype.map()]()
### [Array.prototype.pop()]()
### [Array.prototype.push()]()
### [Array.prototype.reduce()]()
### [Array.prototype.reduceRight()]()
### [Array.prototype.reverse()]()
### [Array.prototype.shift()]()
### [Array.prototype.slice()]()
### [Array.prototype.some()]()
### [Array.prototype.sort()]()
### [Array.prototype.splice()]()
### [Array.prototype.toLocaleString()]()
### [Array.prototype.toSource()]()
### [Array.prototype.toString()]()
### [Array.prototype.unshift()]()
### [Array.prototype.values()]()
### [Array.prototype[@@iterator]()]()
### [get Array[@@species]]()

## END

> 2017-2-13 立项
