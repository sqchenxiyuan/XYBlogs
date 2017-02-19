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

### [Array.prototype.filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

#### 介绍

filter() 方法使用指定的函数测试所有元素，并返回一个包含所有通过测试的元素的新数组。

#### 语法

> array.filter(callback[, thisArg])

#### 参数

|参数名|参数描述|
|:---|:---|
|callback|用来检测每个值的回调函数,callback 被调用时传入三个参数：元素值，元素的索引，原数组。|
|thisArg|执行 callback 时使用的 this 值。|

#### 返回

返回由满足函数的元素组成的新的数组。

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
console.log(arr1.filter(smallthan10));//[3]
console.log(arr1);//[11,22,3]  原数组不变
let arr2=[11,22,33];
console.log(arr2.filter(smallthan10));//[]

let obj={
  x:11
};

let arr3=[99,111,222];
console.log(arr3.filter(smallthan10,obj));//[99]

```

### [Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

#### 介绍

Array.prototype.map() 方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。

#### 语法

> array.map(callback[, thisArg])

#### 参数

|参数名|参数描述|
|:---|:---|
|callback|用来计算每个值的回调函数,callback 被调用时传入三个参数：元素值，元素的索引，原数组。|
|thisArg|执行 callback 时使用的 this 值。|

#### 返回

返回由每个元素根据函数的出的值组成的新数组。

#### 案例

``` JavaScript

function big(element,index,array){
  return element*10;
}

let arr1=[1,2,3,4];
let arr2=arr1.map(big);
console.log(arr1);//[1, 2, 3, 4]
console.log(arr2);//[10, 20, 30, 40]

```

### [Array.prototype.reduce()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

#### 介绍

Array.prototype.reduce() 方法对累加器的数值和数组的每个值应用一个函数 (从左到右)，计算出最终的一个值。

#### 语法

> array.reduce(callback,[initialValue])

#### 参数

|参数名|参数描述|
|:---|:---|
|callback|用来计算最终值的回调函数,callback 被调用时传入四个参数：上一次调用回调返回的值(或者初始值)，数组中将要处理的元素，数据中将要处理的元素索引，原数组。|
|initialValue|其值用于第一次调用 callback 的第一个参数，如果没有，reduce将会从第二个元素开始|

#### 返回

返回计算的结果

#### 案例

``` JavaScript

let arr1=[1,2,3,4];
console.log(arr1.reduce((a,b)=>{
  console.log(b);
  return a+b;
}));
//2
//3
//4
//10
console.log(arr1.reduce((a,b)=>{
  return a+b;
},10));//20

let arr2=[{x:1}];
console.log(arr2.reduce((a,b)=>{
  console.log(a,b);
  return a+b;
}));//{x:1}

```

#### 注意

> 1.当没有 initialValue 时，函数会直接从第二个元素开始。

> 2.当数组只有一个元素时，且有 initialValue 时，函数直接返回那个元素，所以建议都加上 initialValue

### [Array.prototype.reduceRight()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/ReduceRight)

#### 介绍

Array.prototype.reduceRight() 方法对累加器的数值和数组的每个值应用一个函数 (从右到左，与reduce()相反)，计算出最终的一个值。

#### 语法

> array.reduceRight(callback[, initialValue])

#### 参数

|参数名|参数描述|
|:---|:---|
|callback|用来计算最终值的回调函数,callback 被调用时传入四个参数：上一次调用回调返回的值(或者初始值)，数组中将要处理的元素，数据中将要处理的元素索引，原数组。|
|initialValue|其值用于第一次调用 callback 的第一个参数，如果没有，reduceRight()将会从倒数第二个元素开始|

#### 返回

返回计算出的值

#### 案例

``` JavaScript

let arr1=[1,2,3,4];
console.log(arr1.reduceRight((a,b,index,arr)=>{
  console.log(b);
  return a+b;
}));
//3
//2
//1
//10

console.log(arr1.reduceRight((a,b,index,arr)=>{
  return a+b;
},10));
//20

```

#### 注意

> 1.当没有 initialValue 时，函数会直接从第二个元素开始。

> 2.当数组只有一个元素时，且有 initialValue 时，函数直接返回那个元素，所以建议都加上 initialValue


### [Array.prototype.forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

#### 介绍

forEach() 方法对数组的每个元素执行一次提供的函数。

#### 语法

> array.forEach(callback[, thisArg])

#### 参数

|参数名|参数描述|
|:---|:---|
|callback|对每个参数进行处理的函数,callback 被调用时传入三个参数：元素值，元素的索引，原数组。|
|thisArg|执行 callback 时使用的 this 值。|

#### 返回

返回 `undefined`

#### 案例

``` JavaScript

function biger(element,index,array){
  array[index]=element*10;
}

let arr1=[1,2,3];
console.log(arr1.forEach(biger));//undefined
console.log(arr1);//[10, 20, 30]

```

#### 注意

> 1.forEach 遍历的范围在第一次调用 callback 前就会确定。调用forEach 后添加到数组中的项不会被 callback 访问到。

> ``` JavaScript

> function add(element,index,array){
>   array.push(index+'a');
>   console.log(element);
> }

> let arr1=[1,2,3];
> console.log(arr1.forEach(add));
> //1
> //2
> //3
> //undefined
> console.log(arr1);//[1, 2, 3, "0a", "1a", "2a"]
>
> ```

> 2.如果已经存在的值被改变，则传递给 callback 的值是 forEach 遍历到他们那一刻的值。已删除的项不会被遍历到。


> ``` JavaScript

> function del(element,index,array){
>    console.log(element);
>   //  delete array[index];
> }

> let arr1=[1,2,3];
> delete arr1[1];
> console.log(arr1.forEach(del));
> //1
> //3
> //undefined
> console.log(arr1);//[1, 2:, 3]

> ```


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


### [Array.prototype.pop()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

#### 介绍

Array.prototype.pop() 方法从数组中删除最后一个元素，并返回该元素。该方法会将数组视为一个堆栈，pop为出栈函数。

#### 语法

> arr.pop()

#### 返回

返回弹出的栈顶元素

#### 案例

``` JavaScript

let arr1=[1,2,3,4,5];
let p=arr1.pop();

console.log(arr1);//[1,2,3,4]
console.log(p);//5

```


### [Array.prototype.push()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

#### 介绍

push() 方法将一个或多个元素添加到数组的末尾，并返回数组的新长度。该方法会将数组视为一个堆栈，push为入栈函数。

#### 语法

> arr.push(element1, ..., elementN)

#### 参数

|参数名|参数描述|
|:---|:---|
|elementN|需要入栈的元素，按顺序入栈|

#### 返回

返回改变后的数组的长度

#### 案例

``` JavaScript

let arr1=[1,2,3,4];
let p=arr1.push('a','b','c');

console.log(arr1);//[1,2,3,4,'a','b','c']
console.log(p);//7


```

### [Array.prototype.shift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

#### 介绍

Array.prototype.shift() 方法从数组中弹出第一个元素，并返回该元素的值。这个方法类似于pop()函数。

#### 语法

> array.shift()

#### 返回

返回弹出的元素

#### 案例

``` JavaScript

let arr1=[1,2,3,4,5];
let p=arr1.shift();

console.log(arr1);//[2,3,4,5]
console.log(p);//1

```


### [Array.prototype.unshift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

#### 介绍

Array.prototype.unshift() 方法将一个或多个元素添加到数组的开头，并返回新数组的长度。

#### 语法

> array.unshift(element1, ..., elementN)

#### 参数

|参数名|参数描述|
|:---|:---|
|elementN|需要入栈的元素，按倒序入栈，像是两个数组拼接|

#### 返回

返回改变后的数组的长度

#### 案例

``` JavaScript

let arr1=[1,2,3];
let p=arr1.unshift('a','b','c');

console.log(arr1);//['a','b','c',1,2,3]
console.log(6);//7


```

### [Array.prototype.reverse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

#### 介绍

Array.prototype.reverse() 方法会颠倒数组中元素的位置。

#### 语法

> array.reverse()

#### 返回

返回该数组

#### 案例

``` JavaScript

let arr1=[1,2,3,4,5];
console.log(arr1.reverse());//[5, 4, 3, 2, 1]
console.log(arr1);//[5, 4, 3, 2, 1]

```


### [Array.prototype.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

#### 介绍

Array.prototype.indexOf()方法返回在数组中可以找到给定元素的第一个索引，如果不存在，则返回-1。

#### 语法

> arr.indexOf(searchElement[, fromIndex = 0])

#### 参数

|参数名|参数描述|
|:---|:---|
|searchElement|需要查找的元素值。|
|fromIndex|从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0|

#### 返回

返回首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1

#### 案例

``` JavaScript

console.log([1,2,3].indexOf(2));//1
console.log([1,2,3].indexOf(2,1));//1
console.log([1,2,3].indexOf(2,2));//-1
console.log([1,2,3].indexOf(5));//-1
console.log([1,2,{1:2}].indexOf({1:2}));//-1

```

### [Array.prototype.lastIndexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

#### 介绍

Array.prototype.lastIndexOf()方法返回在数组中可以找到给定元素的最后一个索引，如果不存在，则返回-1。

#### 语法

> array.lastIndexOf(searchElement[, fromIndex = array.length - 1])

#### 参数

|参数名|参数描述|
|:---|:---|
|searchElement|需要查找的元素值。|
|fromIndex|从该索引处开始逆向查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 array.length - 1|

#### 返回

返回首个被找到的元素在数组中的索引位置; 若没有找到则返回 -1

#### 案例

``` JavaScript

console.log([1,2,1].lastIndexOf(1));//2
console.log([1,2,1].lastIndexOf(1,1));//0
console.log([1,2,'1'].lastIndexOf(1));//0
console.log([1,2,1].lastIndexOf(3));//-1

```


### [Array.prototype.join()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

#### 介绍

Array.prototype.join() 方法将数组（或一个类数组对象）的所有元素连接到一个字符串中。

#### 语法

> array.join(separator)

#### 参数

|参数名|参数描述|
|:---|:---|
|separator|元素间间隔需要插入的字符串，默认为逗号(,)|

#### 返回

返回拼接好的字符串

#### 案例

``` JavaScript

let arr=[1,2,3,'a','b',{x:1}];

console.log(arr.join());//1,2,3,a,b,[object Object]
console.log(arr.join(''));//123ab[object Object]
console.log(arr.join('---'));//1---2---3---a---b---[object Object]

```

### [Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

#### 介绍

Array.prototype.slice() 方法将数组的一部分浅拷贝, 返回到从开始到结束（不包括结束）选择的新数组对象。原始数组不会被修改。

#### 语法

> array.slice(start,end)

#### 参数

|参数名|参数描述|
|:---|:---|
|start|浅拷贝的开始索引，默认为0|
|end|浅拷贝的结束索引，不会提取在结束索引位置的元素，默认为length|

#### 返回

返回提取出来的元素组成的新数组

#### 案例

``` JavaScript

let arr=[1,2,3,'a','b'];

console.log(arr.slice());//[1, 2, 3, "a", "b"]
console.log(arr.slice()===arr);//false
console.log(arr.slice(1));//[2, 3, "a", "b"]
console.log(arr.slice(1,4));//[2, 3, "a"]

```

### [Array.prototype.splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

#### 介绍

Array.prototype.splice() 方法通过删除现有元素和/或添加新元素来更改数组的内容。

#### 语法

> array.splice(start[, deleteCount[, [item1, [item2,[itemN ...]]]]])

#### 参数

|参数名|参数描述|
|:---|:---|
|start|修改的开始位置,如果是负值，则表示从数组末位开始的第几位。|
|deleteCount|整数，表示要移除的数组元素的个数。默认为arr.length - start|
|itemN|需要从开始位置插入的元素，按顺序插入|

#### 返回

由被删除的元素组成的一个数组。

#### 案例

``` JavaScript

let arr1=[1,2,3,'a','b'];
console.log(arr1.splice());//[]
console.log(arr1);//[1,2,3,'a','b']

let arr2=[1,2,3,'a','b'];
console.log(arr2.splice(2));//[3, "a", "b"]
console.log(arr2);//[1, 2]

let arr3=[1,2,3,'a','b'];
console.log(arr3.splice(2,0));//[]
console.log(arr3);//[1,2,3,'a','b']

let arr4=[1,2,3,'a','b'];
console.log(arr4.splice(2,2));//[3, "a"]
console.log(arr4);//[1, 2, "b"]

let arr5=[1,2,3,'a','b'];
console.log(arr5.splice(2,1,'c'));//[3]
console.log(arr5);//[1, 2, "c", "a", "b"]

```

### [Array.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString)

#### 介绍

toString() 返回一个字符串，表示指定的数组及其元素。

Array 对象覆盖了 Object 的 toString 方法。对于数组对象，toString 方法返回一个字符串，该字符串由数组中的每个元素的 toString() 返回值经调用 join() 方法连接（由逗号隔开）组成。

#### 语法

> array.toString()

#### 返回

返回表示数组内容的字符串

#### 案例

``` JavaScript

let arr1=[1,2,3,'a','b'];
console.log(arr1.toString());//1,2,3,a,b

```

### [Array.prototype.toLocaleString()]()

#### 介绍

Array.prototype.toLocaleString() 返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开。

#### 语法

> array.toLocaleString();

#### 返回

返回表示数组内容的使用一个特定语言环境的字符串。

#### 案例

``` JavaScript

var myArr = [1337, new Date(), "foo"];

console.log(myArr.toString());//1337,Sun Feb 19 2017 19:08:50 GMT+0800 (中国标准时间),foo
console.log(myArr.toLocaleString());//1337,Sun Feb 19 2017 19:08:50 GMT+0800 (中国标准时间),foo

```


## ES6+ ==================================================================================================

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

Array.prototype.entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。

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

### [Array.prototype.keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)

#### 介绍

Array.prototype.keys() 方法返回一个新的Array迭代器，它包含数组中每个索引的键。

#### 语法

> arr.keys();

#### 返回

返回一个新的Array迭代器，它包含数组中每个索引的键。

#### 案例

``` JavaScript

let arr = ['a','b','c',1,2,3];
let iterator = arr.keys();
console.log(iterator);//ArrayIterator {}

for (let data of iterator) {
    console.log(data);
}
//0
//1
//2
//3
//4
//5

```

#### 注意

> 1.与Object的keys存在一定区别，索引迭代器会包含那些没有对应元素的索引。

> ``` JavaScript

> let arr = [1,,3,,5];
> console.log(Object.keys(arr));//["0", "2", "4"]
> console.log([...arr.keys()])//[0, 1, 2, 3, 4]

> ```


### [Array.prototype.values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/values)

#### 介绍

Array.prototype.values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值。

#### 语法

> array.values()

#### 返回

返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值。

#### 案例

``` JavaScript

let arr = ['a','b','c',1,2,3];
let iterator = arr.values();
console.log(iterator);//ArrayIterator {}

for (let data of iterator) {
    console.log(data);
}
//'a'
//'b'
//'c'
//1
//2
//3

```


### [Array.prototype.fill()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)

#### 介绍

Array.prototype.fill() 方法将一个数组的所有元素从开始索引填充到具有静态值的结束索引

#### 语法

> arr.fill(value, start, end)

#### 参数

|参数名|参数描述|
|:---|:---|
|value|需要用来填充的元素|
|start|开始索引，默认为0,如果开始索引为负数则从后往前算|
|end|结束索引，默认为arr.length，结束索引所在的位置不会被覆盖|

#### 返回

返回改变后的数组本身

#### 案例

``` JavaScript

let arr1 = [1,2,3,4,5];
let p = arr1.fill(0);
console.log(arr1);//[0,0,0,0,0]

let arr2 = [1,2,3,4,5];
p = arr2.fill(0,1,2);
console.log(arr2);//[1,0,3,4,5]

let arr3 = [1,2,3,4,5];
p = arr3.fill(0,-2,-1);
console.log(arr3);//[1,2,3,0,5]

```

### [Array.prototype.find()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

#### 介绍

Array.prototype.find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

#### 语法

> array.find(callback[, thisArg])

#### 参数

|参数名|参数描述|
|:---|:---|
|callback|用来检测每个值的回调函数,callback 被调用时传入三个参数：元素值，元素的索引，原数组。|
|thisArg|执行 callback 时使用的 this 值。|

#### 返回

返回第一个满足函数的元素。如果没有则返回 `undefined`。

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
console.log(arr1.find(smallthan10));//3
let arr2=[11,22,33];
console.log(arr2.find(smallthan10));//undefined

let obj={
  x:11
};

let arr3=[99,111,222];
console.log(arr3.find(smallthan10,obj));//99

```

### [Array.prototype.findIndex()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

#### 介绍

Array.prototype.findIndex()方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

#### 语法

> array.findIndex(callback[, thisArg])

#### 参数

|参数名|参数描述|
|:---|:---|
|callback|用来检测每个值的回调函数,callback 被调用时传入三个参数：元素值，元素的索引，原数组。|
|thisArg|执行 callback 时使用的 this 值。|

#### 返回

返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1。

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
console.log(arr1.findIndex(smallthan10));//2
let arr2=[11,22,33];
console.log(arr2.findIndex(smallthan10));//-1

let obj={
  x:11
};

let arr3=[99,111,222];
console.log(arr3.findIndex(smallthan10,obj));//0

```

### [Array.prototype.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

#### 介绍

Array.prototype.includes() 方法用来判断当前数组是否包含某指定的值，如果是，则返回 true，否则返回 false。

#### 语法

> array.includes(searchElement[, fromIndex = 0])

#### 参数

|参数名|参数描述|
|:---|:---|
|searchElement|需要查找的元素值。|
|fromIndex|从该索引处开始查找 searchElement。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜索。默认为 0|

#### 返回

返回布尔值，存在返回 `true` ,不存在返回 `false`

#### 案例

``` JavaScript

console.log([1,2,3].includes(1));//true
console.log([1,2,3].includes(1,1));//false
console.log([1,2,3].includes(5));//false
console.log([1,2,{1:2}].includes({1:2}));//false

```

#### 注意

> 1. 对于对象的查找依然是按照引用查找

## 未解决

### [Array.prototype[@@iterator]()]()
### [get Array[@@species]]()

## END

> 2017-2-19 完成

> 2017-2-13 立项
