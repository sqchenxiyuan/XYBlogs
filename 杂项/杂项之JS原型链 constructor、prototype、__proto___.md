# 杂项之JS原型链 prototype、\_\_proto\_\_ 、constructor

前端时间研究JS对象的深复制，想要保持原有的原型链，折腾了半天才弄出来，主要是对原型链不太熟悉，只是知道一些简单的东西，这篇文章就主要来研究一下 原型链中prototype、\_\_proto\_\_ 、constructor 三者的关系

## 一切皆对象

JS中的一切数据都是对象(Object),都可以使用 **new** 来建立，平时我们常用的写法都是语法糖，方便我们的开发。

比如：

``` javascript

var num=new Number('123');
var num2=123;

console.log(num);//Number {[[PrimitiveValue]]: 123}
console.log(typeof num);//object
console.log(num2);//123
console.log(typeof num2);//number
console.log(typeof (num+num2));//number
console.log(num2==num);//true
console.log(num2===num);//false
console.log(num2===num+0);//true
console.log(num2.constructor===num.constructor);//true
console.log(num2.prototype===num.prototype);//true
console.log(num2.__proto__===num.__proto__);//true

```

我们可以使用 **new Number(value)** 来创建数字，这个数字对象依然可以参加数值运算,与直接赋值的方法看起来没有差别，但是使用 **typeof** 可以看到使用 **new** 创建的数字是一个Object对象，所以在 **===** 下比较时类型不同，直接为false。

那么是不是所有用 **new** 创建的对象都为 *object* 呢？

``` javascript

var num=new Number('123');
var num2=123;
console.log(num);//Number {[[PrimitiveValue]]: 123}
console.log(typeof num);//object
console.log(num2);//123
console.log(typeof num2);//number

var str=new String('a');
var str2='a';
console.log(str);//String {0: "a", length: 1, [[PrimitiveValue]]: "a"}
console.log(typeof str);//object
console.log(str2);//a
console.log(typeof str2);//string

var bool=new Boolean(true);
var bool2=true;
console.log(bool);//Boolean {[[PrimitiveValue]]: true}
console.log(typeof bool);//object
console.log(bool2);//true
console.log(typeof bool2);//boolean

var arr=new Array();
var arr2=[];
console.log(arr);//[]
console.log(typeof arr);//object
console.log(arr2);//[]
console.log(typeof arr2);//object

var date=new Date();
console.log(date);//Sat Nov 26 2016 19:05:24 GMT+0800 (中国标准时间)
console.log(typeof date);//object

var nu=null;
var und=undefined;
console.log(typeof nu);//object
console.log(typeof und);//undefined;

var foo=new Function('a,b','return a+b;');
console.log(typeof foo);//function

```

我们可以看到几乎所有使用 **new** 创建的数据，的 **typeof** 都是对象，同时在经过运算后只有基础类型和函数对象的 **typeof** 是它们自己的类型名，其它系统的本地对象都是对象类型名。但即使是基础类型，也都是对象！，只有函数对象才和基础的对象有一些区别。

## 基础对象和函数对象

``` javascript

var foo1=new Function('a,b','return a+b;');
var foo2=function(){this.name=1};
function foo3(){}

var obj1={name:1};
var obj2=new Object(obj1);
var obj3=new foo2();

console.log(typeof foo1);//function
console.log(typeof foo2);//function
console.log(typeof foo3);//function

console.log(typeof obj1);//object
console.log(typeof obj2);//object
console.log(typeof obj3);//object

```

上面的例子中我们可以快速的看到函数无论如何的方法创建，它的类型都是 **function** 所以平时我们判断这个变量是否为函数,都使用的 **typeof** 来进行判断。总之函数对象和普通对象是有一些区别的，下面我们慢慢来研究。

## 原型链

### 继承

平时我们写JS继承的方法大多是写一个构造函数或者使用 **prototype**，如下：

``` javascript

function fun1(){
  this.name='cat';
  this.age=12
}

fun1.prototype.getName=function(){
    return this.name;
};

var o1=new fun1();
console.log(o1.name);//cat
console.log(o1.getName());//cat

function fun2(){}

fun2.prototype=o1;


var o2=new fun2();
console.log(o2.name);//cat
o2.name='dog';
console.log(o2.name);//dog
console.log(o2.getName());//dog

```

只要经过构造函数和prototype我们就可以实现继承的效果。而这个实现的经过就要了解 **原型链** ！！！

### prototype 和 \_\_proto\_\_

结合上面的代码，我们看下面的代码：

``` javascript

console.log(o2.__proto__===fun2.prototype);//true
console.log(fun2.prototype===o1);//true
console.log(o2.__proto__===o1);//true

console.log(o1.__proto__===fun1.prototype);//true
console.log(fun1.__proto__===Function.prototype);//true
console.log(Function.__proto__===Object.__proto__);//true

```

fun2 作为o2的构造函数，它的 **prototype** 和 构造出来的对象的 **\_\_proto\_\_** 是相同的，在JS中当两个对象相同时，就说明他们是同一个对象引用。可见使用构造函数后，新建的对象的 **\_\_proto\_\_** 属性直接引用构造函数的 **prototype** 属性。

![](http://p1.bpimg.com/567571/cce9311d5278a233.png)

### 原型链构成

当一个对象查询自己的属性时，它会首先遍历自己所带的属性，当发现没有这个属性的时候，它遍会去查找 **\_\_proto\_\_** 的属性，结合前面的内容可以知道， **\_\_proto\_\_** 属性便是构造函数的 **prototype**，所以新建立的对象可以访问构造函数的 **prototype** 属性内的属性来达到继承的效果。然后如果 **prototype** 也没有需要查找的属性，会继续去查找 **prototype** 的 **\_\_proto\_\_** 属性，这样循环往复，直到 **\_\_proto\_\_** 为 **null**。

``` javascript

console.log(o2.__proto__);
console.log(o2.__proto__.__proto__);
console.log(o2.__proto__.__proto__.__proto__);
console.log(o2.__proto__.__proto__.__proto__.__proto__);
console.log(o2.__proto__.__proto__.__proto__.__proto__.__proto__);

```

![](http://i1.piimg.com/567571/68f7f892e501ac6e.png)

![](http://p1.bqimg.com/567571/7115fd5211d15b7e.png)

#### 注意

在JS中 **\_\_proto\_\_** 属性是可以修改的，原型链的结束 **null** 的出现也只是将Object的 **prototype** 属性的 **\_\_proto\_\_** 的属性设为获取时返回了 null ，可以之前的图中看到。在我们修改后就会失去这个屏障 导致无限循环的查找属性。

``` javascript

var a={};
var b={}
a.__proto__=b;
b.__proto__=Object;
Object.__proto__=a;//error!! 会导致无线循环

```

![](http://i1.piimg.com/567571/1b68eff2123fd46e.png)

### constructor

在继承中还有一个重要的角色 **constructor**，每个函数的 **prototype** 属性中都有一个 **constructor** 属性，这个属性是指向构造函数的。

``` javascript

console.log(fun1.prototype);
console.log(fun1.prototype.constructor===fun1);//true

```

![](http://p1.bqimg.com/567571/86dd36cf3b140dd6.png)

#### 注意

特别注意的是因为 **prototype** 属性也是可以编辑的，如果直接给 **prototype** 赋值覆盖掉过去的，那么就会丢失 **constructor**。

``` javascript

function f1(){}
f1.prototype={getname:function(){}};

function f2(){}
f1.prototype.getname=function(){};

console.log(f1.prototype.constructor);
console.log(f1.prototype.constructor===Object.prototype.constructor);//true
console.log(f2.prototype.constructor);

```

![](http://i1.piimg.com/567571/e2a4fd4407543898.png)

可见f1的 **constructor** 是object的 **constructor**，因为直接使用了以恶搞对象覆盖 **prototype**，在实例化的对象的 **\_\_proto\_\_** 中找不到 **constructor**，解释器会沿着原型链查找，导致找出来的是object的 **constructor**。所以尽量一个个属性复制上去，不要使用字面量的方式。

## Object和Function (扯犊子)

``` javascript

console.log(Object.prototype.constructor);
console.log(Object.prototype.constructor===Object);//true
console.log(Function.prototype.constructor);
console.log(Function.prototype.constructor===Function);//true
console.log(Object.__proto__);//function(){}
console.log(Function.__proto__);//function(){}
console.log(Object.__proto__===Function.__proto__);//true
console.log(Object.__proto__===Object.prototype);//false

```

到这就是扯犊子的时候了~~~

为什么要将 Object和Function 明显的区分开呢，因为对象离不开函数，函数离不开对象吧~~~

函数必定是对象，但能实现对象所不能达到的功能~~~

这TM都是别人定义好的，想这么多羔皮= =

## 总结

1. 原型链是沿着 **\_\_proto\_\_** 对属性进行查找;
2. 原型链的 **\_\_proto\_\_** 继承至构造函数的 **prototype**;
3. 可以利用 **constructor** 获取新的实例;
4. Object 和 Function 很NB;

## END

>2016-11-26 完成
>
>2016-11-19 立项
