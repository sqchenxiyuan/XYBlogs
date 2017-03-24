# JS详解之this？ ha？

最近写代码被JS的this变量弄得一脸懵逼，这篇文章主要讲述JS的this变量。其实很简单ヾ(。￣□￣)ﾂ゜゜゜

## 简介

`this` 是Javascript的一个重要关键字，它用来传递程序运行时的环境，代表运行的环境本身。

在不同的运行环境下，`this` 也有一些不同。

### 全局上下文

在全局上下文运行的时候，`this`都是指代的全局对象，无论是否在严格模式下。

``` javascript

//在浏览器中，全局上下文环境下的this,就是window。
console.log(this);//window
console.log(this===window);//true

```

但是当函数是在严格模式下，那么它的 `this` 将为undefined。

``` javascript

function staticfoo(){
  'use strict';
  console.log(this);//undefined
  console.log(this===window);//false
}

staticfoo();

```

### 函数上下文

在函数中 `this` 的值与函数如何调用有关。

#### 直接调用

当将定义的函数直接调用时，函数内部的 `this` 将指代的全局环境。

``` javascript

function foo(){
  console.log(this);//window
  console.log(this===window);//true
}

foo();

```

#### 对象方法调用

当以对象的方法调用时，函数内部的 `this` 将指代调用这个方法的对象。

``` javascript

var x=1;
var y='1';

var obj={
  x:2,
  foo:function(){
    console.log(this.x,this.y);//2，undefined   

    function foo2(){
      console.log(this.x,this.y);//1，'1'   函数内部直接调用函数，this依然是全局变量   
    }
    foo2();
  }
};

obj.foo();

```

##### 注意

1.  函数中 `this` 的绑定行为不与函数的申明方式和申明位置有关，只与被调用的方式有关。

    ``` javascript

    var x=1;
    var y='1';

    var obj={
      x:2,
      foo:function(){
        console.log(this.x,this.y);
      }
    };
    var foo=obj.foo;

    obj.foo();//2，undefined   
    foo();//1，'1'

    ```
2. `this` 的绑定只受最近的调用对象绑定，与调用对象的来源无关。

    ``` javascript

    var x=1;
    var y='1';

    function foo(){
      console.log(this.x,this.y);
    }

    var obj={
      x:2,
      foo:foo,
      obj2:{
        x:3,
        foo:foo
      }
    };

    foo();//1，'1'
    obj.foo();//2，undefined   
    obj.obj2.foo();//3，undefined   

    ```

#### 构造函数调用

当函数作为构造函数调用时，`this` 绑定的即将创建的新的对象的引用,无论调用时所处的位置。

``` javascript

function foo(){
  console.log(this.x,this.y)
  this.x=2;
  this.y=2;
}

var obj={
  x:1,
  y:1,
  foo:foo,
};

obj.foo();
//1 1
console.log(new obj.foo());
//undefined undefined
//{x: 2, y: 2}

```

#### call 和 apply 调用指定this

`call` 和 `apply` 这两个函数是在Function.prototype上面，所以所有的函数都可以执行。

使用 `call` 和 `apply` 可以指定函数运行的 `this` 环境。

``` javascript

var obj={
  x:1,
  y:1,
  foo(){
    console.log(this.x,this.y);
  }
};

var obj2={
  x:2,
  y:2
};

obj.foo();
//1 1
obj.foo.call(obj2);
//2 2
obj.foo.apply(obj2);
//2 2

```

#### bind方法生成固定函数this环境

`bind()` 方法会创建一个新函数。当这个新函数被调用时，bind()的第一个参数将作为它运行时的 `this` 环境。

``` javascript

var obj={
  x:1,
  y:1,
  foo(){
    console.log(this.x,this.y);
  }
};

obj2={
  x:2,
  y:2
};

var foo2=obj.foo.bind(obj2);

obj.foo();
//1 1
foo2();
//2 2

delete obj2;//移除obj2

foo2();
//2 2    引用依然还在

```

#### 浏览器事件中的this

在浏览器的事件中 `this` 绑定的触发事件的DOM元素（包括内联事件）。

## END

> 2017-2-24 编写完成

> 2017-2-8 立项
