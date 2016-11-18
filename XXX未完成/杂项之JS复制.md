# 杂项之JS复制/拷贝

前端时间写代码，出现了一些恶心的BUG，后来发现是因为改变数据时没有进行深复制导致源数据被修改。于是想写一篇博客来研究如何进行高效的深度复制。

## JS的赋值

在JS中我们给数据复制都是通过 **=** 来赋值，但在JS中除了基本类型外，所有赋值都是采用引用的方法(引用类型)，类似于C++中的指针。

当你赋值一个基础类型时，JS解释器会复制一个新的内容给你复制的对象,当你改变其中一个的数据时，另一个是不会改变的。

``` javascript

var a = 1;//number类型
var b = 'string';//string类型
var c = true;//布尔类型
var d = undefined;//未定义
var e = null;//未赋值

var a1 = a;
var b1 = b;
var c1 = b;
var d1 = d;
var e1 = e;

var a1 = 2;
console.log(a);//1
console.log(a1);//2

var b1 = 'string2';
console.log(b);//string
console.log(b1);//string2

var c1 = false;
console.log(c);//1
console.log(c1);//1

var d1 = null;
console.log(d);//undefined
console.log(d1);//null

var e1 = undefined;
console.log(e);//null
console.log(e1);//undefined

```

而当你赋值一个引用类型时，JS解释器只是将引用赋值给赋值对象，这时这两个变量操作的是同一个对象。修改其中一个，另一个也会被修改。

``` javascript

var f = {
  name:"string",
  age:12
};

var f1 = f;

console.log(f);//{name:"string",age:12}
console.log(f1);//{name:"string",age:12}
f1.name="string22222";
console.log(f);//{name:"string22222",age:12}
console.log(f1);//{name:"string22222",age:12}

```

## 深拷贝的方法

### 纯数据拷贝的简单方法

当你需要拷贝的变量，是全有数据组成时可以使用一下简单的方法拷贝;

> JSON

``` javascript

var g={
  a:"string",
  b:123,
  c:false,
  d:null,
  f:undefined,
  g:[123123,"asdasd"],
  h:{
    hahah:234
  }
};

var g1=JSON.parse(JSON.stringify(g));

console.log(g);
console.log(g1);

console.log(g.a)//string
console.log(g1.a)//string
g1.a="string233";
console.log(g.a)//string
console.log(g1.a)//string233

```

![](http://p1.bqimg.com/567571/a8353722e92484c1.png)

 你可以从上图中看出两个变量引用的是不同的数据了，但值得注意的是克隆出来的数据并没有将 **undefined** 的数据以及方法克隆出来。

#### 注意

> 1.只能复制纯数据，会丢失 **undefined** 以及 **function** 数据
>
> 2.整个数据对象都会被拷贝出来，不会保留任何引用

### 数组的深拷贝

数组的深度拷贝可以利用数组自带的函数进行, **slice** 和 **concat**。

下面以 **slice** 函数为例。

**slice** 函数是将一个数组的一部分返回为一个新的数组给我们,在这里我们直接将整个数组范围包括进去就行。

``` javascript

var h=[
  "string",
  123,
  false,
  null,
  undefined,
  [123123,"asdasd"],
  {
    hah:234
  },
  function(){
    return "asd";
  }
];

var h1=h.slice(0,h.length);

console.log(h);
console.log(h1);

console.log(h[0])//string
console.log(h1[0])//string
h1[0]="string233";
console.log(h[0])//string
console.log(h1[0])//string233

console.log(h[6])//{hah:234}
console.log(h1[6])//{hah:234}
h1[6].hah="string233";
console.log(h[6])//{hah:string233}
console.log(h1[6])//{hah:string233}
console.log(h[6]===h1[6])//true
console.log(h[7]===h1[7])//true

```

![](http://i1.piimg.com/567571/b0fd7c48c64b0a54.png)

这里我们可以看出这个方法拷贝出了全部的信息， **undefined** 和 **function** 都拷贝了出来。但是原来数组引用的对象依然是引用的，是引用的同一个对象的。

#### 注意

> 1.更深一层的引用无法去除

## END

> 2016-11-15 立项
