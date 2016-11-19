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

### 对象的深拷贝

对象的深拷贝主要通过遍历的方法来实现，如下

``` javascript

var obj=function(){
  this.name="haha";
  this.age=123;
  this.obj={
    newname:"biubiu"
  }
}

obj.prototype={
  foo:function(){return this.name;}
}

var i=new obj();
var i1=copy(i);

console.log(i);
console.log(i1);
i1.name="haha233";
console.log(i.name);//haha
console.log(i1.name);//haha233

function copy(obj){
  var newobj={};
  for(var name in obj){
    if(typeof obj[name] === 'object'){
      newobj[name]=copy(obj[name]);
    }else{
      newobj[name]=obj[name];
    }
  }
  return newobj;
}

```

![](http://p1.bqimg.com/567571/61b0639a6a707d72.png)

通过这样的简单的函数可以快速的拷贝出对象的数据，但有一些问题:

### 问题一：循环调用死循环

当我将函数内的一个属性指向这个对象构成相互引用，或者内部有这么一个循环，那么浏览器就会超出堆栈上限报错！

``` javascript

var obj=function(){
  this.name="haha";
  this.age=123;
  this.obj={
    newname:this
  }
}

```

![](http://i1.piimg.com/567571/da0349e4c13bed2a.png)

所以我们需要将 *即将被拷贝* 和 *拷贝后* 的对象存储起来，方便变比对引用。

``` javascript

function copy(obj){
  var objlist=[];
  return clone(obj);

  function clone(oldobj){
    var newobj={};

    objlist.push({
      old:oldobj,
      new:newobj
    });

    for(var name in oldobj){
      if(typeof oldobj[name] === 'object'){
        newobj[name]=getCloned(oldobj[name]);
        if(!newobj[name])
        newobj[name]=clone(oldobj[name]);
      }else{
        newobj[name]=oldobj[name];
      }
    }
    return newobj;
  }

  function getCloned(obj){
    var x=false;
    objlist.forEach(function(a){
      if(obj===a.old) x=a.new;
    })
    return x;
  }
}

```

![](http://p1.bqimg.com/567571/c4e85071872c227e.png)

这样就解决了这个问题，同时保证了数据内容的逻辑关联。

### 问题二：原型链继承

第一代码的运行结果中，我们可以看到遍历将原型链上的函数也拷贝下来了，如果原型有数据那么数据也会拷贝下来，然而在实际中我们需要继承原型而不是拷贝出来，不然这样的话原型的变动不会影响到我们克隆出来的对象。

这时我们就要用到原型链中的 **__proto__** 了，相关内容会在下一篇文章中讲述。

同时我们需要 **hasOwnProperty** 函数来判断属性是否为对象自己所有。

``` javascript

var obj=function(){
  this.name="haha";
  this.age=123;
  this.obj={
    newname:this
  }
}

obj.prototype={
  foo:function(){return this.name;},
  num:123
}

var i=new obj();
var i1=copy(i);

console.log(i);
console.log(i1);

console.log(i.num);
console.log(i1.num);
obj.prototype.num="haha233";
console.log(i.num);
console.log(i1.num);

function copy(obj){
  var objlist=[];
  return clone(obj);

  function clone(oldobj){
    var Constructor=function(){};
    Constructor.prototype=oldobj.__proto__;
    var newobj=new Constructor();

    objlist.push({
      old:oldobj,
      new:newobj
    });

    for(var name in oldobj){
      if(!oldobj.hasOwnProperty(name)) continue;
      if(typeof oldobj[name] === 'object'){
        newobj[name]=getCloned(oldobj[name]);
        if(!newobj[name])
        newobj[name]=clone(oldobj[name]);
      }else{
        newobj[name]=oldobj[name];
      }
    }
    return newobj;
  }

  function getCloned(obj){
    var x=false;
    objlist.forEach(function(a){
      if(obj===a.old) x=a.new;
    })
    return x;
  }
}

```

![](http://p1.bqimg.com/567571/97fc3b2c3408cec6.png)

这样就差不多完成了一个对象的数据克隆，同时保留了内部的逻辑关联和原型链的继承。

刚开始学JS的时候以为这些都很简单，但回头一看这些东西其实很重要同时也很复杂，前端之路任重而道远~~~！！

## END

> 2016-11-19 完成
>
> 2016-11-15 立项
