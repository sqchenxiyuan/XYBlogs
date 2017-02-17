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

### [Array.of()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/of)

#### 介绍

Array.of()函数是用来创建一个新的数组的方法。

#### 语法

> Array.of(element0[, element1[, ...[, elementN]]])

#### 参数

|参数名|参数描述|
|:---|:---|
|elementN|构成数组的参数，按顺序排列|

#### 返回

返回构建好的新的数组实例

#### 案例

``` JavaScript

let arr1=[5];
let arr2=[1,2,3];
let arr3=Array(5);
let arr4=Array(1,2,3);
let arr5=Array.of(5);
let arr6=Array.of(1,2,3);

console.log(arr1);//[5]
console.log(arr2);//[1,2,3]
console.log(arr3);//[undefined,undefined,undefined,undefined,undefined]
console.log(arr4);//[1,2,3]
console.log(arr5);//[5]
console.log(arr6);//[1,2,3]

```

#### 注意

> Array.of()和Array()存在区别，Array.of()输入一个数值时只是将参数当作一个元素，而Array()会将这个数值当为数组的长度

> ``` JavaScript

> let arr1=Array(5);
> let arr2=Array.of(5);

> console.log(arr1);//[undefined,undefined,undefined,undefined,undefined]
> console.log(arr1.length);//5
> console.log(arr2);//[5]
> console.log(arr2.length);//1

> ```

### [Array.prototype.concat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

#### 介绍

这个方法主要是将两个或多个值或数组合并为一个 **新** 的数组，他不会改变原有数组

#### 语法

> array.concat(value1[, value2[, ...[, valueN]]])

#### 参数

|参数名|参数描述|
|:---|:---|
|valueN|需要与原数组合并的数组或值|

#### 返回

返回按顺序合并的新数组。

#### 案例

``` JavaScript

let arr1=[1,2,3];
let arr2=[4,5,6];
let arr3=arr1.concat(arr2);
let arr4=arr3.concat(7);

console.log(arr1);//[1,2,3]
console.log(arr2);//[4,5,6]
console.log(arr3);//[1,2,3,4,5,6]
console.log(arr4);//[1,2,3,4,5,6,7]

```

#### 注意

> 1.这个函数是返回的新数组

> 2.这个函数是进行浅拷贝

> ``` JavaScript

> let arr1=[{x:1},{x:2},{x:3}];
> let arr2=arr1.concat(arr1);

> console.log(arr2);//[{x:1},{x:2},{x:3},{x:1},{x:2},{x:3}]
> arr1[0].x=4;
> console.log(arr2);//[{x:4},{x:2},{x:3},{x:4},{x:2},{x:3}]

> ```


### [Array.prototype.every()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

#### 介绍

Array.prototype.every() 方法测试数组的所有元素是否都通过了指定函数的测试。

#### 语法

> array.every(callback[, thisArg])

#### 参数

|参数名|参数描述|
|:---|:---|
|callback|用来检测每个值的回调函数,callback 被调用时传入三个参数：元素值，元素的索引，原数组。|
|thisArg|执行 callback 时使用的 this 值。|

#### 返回

返回检测的结果，为布尔值

#### 案例

``` JavaScript

function bigthan10(element,index,array){
  if(this.x){
    return element/this.x>10
  }else{
    return element>10
  }
}

let arr1=[11,22,3];
console.log(arr1.every(bigthan10));//false
let arr2=[11,22,33];
console.log(arr2.every(bigthan10));//true

let obj={
  x:11
};

let arr3=[99,111,222];
console.log(arr3.every(bigthan10,obj));//false

```

### [Array.prototype.some()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

#### 介绍

Array.prototype.some() 方法测试数组的是否有元素通过了指定函数的测试，与 Array.prototype.every() 方法相对。

#### 语法

> array.some(callback[, thisArg])

#### 参数

|参数名|参数描述|
|:---|:---|
|callback|用来检测每个值的回调函数,callback 被调用时传入三个参数：元素值，元素的索引，原数组。|
|thisArg|执行 callback 时使用的 this 值。|

#### 返回

返回检测的结果，为布尔值

#### 案例

``` JavaScript

function smallthan10(element,index,array){
  if(this.x){
    return element/this.x<10
  }else{
    return element<10
  }
}

let arr1=[11,22,3];
console.log(arr1.some(smallthan10));//true
let arr2=[11,22,33];
console.log(arr2.some(smallthan10));//false

let obj={
  x:11
};

let arr3=[99,111,222];
console.log(arr3.some(smallthan10,obj));//true

```

### [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

#### 介绍

Array.prototype.sort() 方法在适当的位置对数组的元素进行排序，并返回数组。 sort 排序不一定是稳定的。默认排序顺序是根据字符串Unicode码点。

#### 语法

> array.sort(compareFunction)

#### 参数

|参数名|参数描述|
|:---|:---|
|compareFunction|用来排序的函数，传入相互比较的a、b对象，通过返回数字进行排序：负数表示不交换(a前b后)，正数表示交换(b前a后)，0表示不变。|

#### 返回

返回排序后的数组

#### 案例

``` JavaScript

function comp(a,b){
  return a-b;
}

let arr1=[11,22,3,1,323,443,5];
console.log(arr1.sort(comp));//[1, 3, 5, 11, 22, 323, 443]
console.log(arr1);//[1, 3, 5, 11, 22, 323, 443]

```

#### 注意

> 1.当不输入compareFunction时，函数默认采用Unicode位点进行排序。

> ``` JavaScript

> let arr1=[11,22,3,1,323,443,5];
> console.log(arr1.sort());//[1, 11, 22, 3, 323, 443, 5]
> //这里将数字类型转化为了字符串进行比较

> ```


### [Array.prototype.pop()]()
### [Array.prototype.push()]()
### [Array.prototype.shift()]()
### [Array.prototype.unshift()]()


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


### [Array.prototype.copyWithin()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin)

#### 介绍

Array.prototype.copyWithin()方法会浅拷贝数组的部分元素到同一数组的不同位置，且不改变数组的大小，然后返回该数组。

#### 语法

> array.copyWithin(target[, start[, end]])

#### 参数

|参数名|参数描述|
|:---|:---|
|target|序列复制到的索引位子。如果是负数，target 将从末尾开始计算,如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。|
|start|开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。默认为0|
|end|开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。默认为array.length|

#### 返回

返回修改后的数组

#### 案例

``` JavaScript

let arr1=[1,2,3,4,5];
console.log(arr1);//[1,2,3,4,5]
let arr2=arr1.copyWithin(1);
console.log(arr1);//[1,1,2,3,4]   会修改原始数字本身
console.log(arr2);//[1,1,2,3,4]

let arr3=[1,2,3,4,5];
console.log(arr3.copyWithin(1,2,4));//[1,3,4,4,5]

```

#### 注意

> 1.该函数会修改原始数组,并且不是插入，是进行的覆盖操作。

> 2.start所在索引必须小于end

### [Array.prototype.entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

#### 介绍

entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。

#### 语法

> arr.entries();

#### 返回

返回一个新的 Array 迭代器对象。

#### 案例

``` JavaScript

let arr = ['a','b','c',1,2,3];
let iterator = arr.entries();
console.log(iterator);//ArrayIterator {}

for (let data of iterator) {
    console.log(data);
}
//[0, "a"]
//[1, "b"]
//[2, "c"]
//[3, 1]
//[4, 2]
//[5, 3]

```



## list

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
### [Array.prototype.reduce()]()
### [Array.prototype.reduceRight()]()
### [Array.prototype.reverse()]()
### [Array.prototype.slice()]()
### [Array.prototype.splice()]()
### [Array.prototype.toLocaleString()]()
### [Array.prototype.toSource()]()
### [Array.prototype.toString()]()
### [Array.prototype.values()]()
### [Array.prototype[@@iterator]()]()
### [get Array[@@species]]()

#### 介绍

#### 语法

#### 参数

#### 返回

#### 案例

## END

> 2017-2-13 立项
