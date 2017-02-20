# JS详解之this？ ha?

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

### 函数上下文

在函数中 `this` 的值与函数如何调用有关。

#### 直接调用

当将定义的函数直接调用时，它的 `this` 将指代的全局环境。

``` javascript

function foo(){
  console.log(this);//window
  console.log(this===window);//true
}

foo();

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


## END

> 2017-2-8 立项
