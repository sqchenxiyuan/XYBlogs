# JS异步编程方法

异步永远是编程的一个重要话题，可以提高对计算机资源的利用，避免阻塞等等。这篇文章将讲述JS编程中异步编程的几种方法。

## 传统的异步编程  callback

传统的异步编程当然是回调，即使后来的异步编程再便捷，它的核心依然是回调。

回调就是：将一个函数（回调函数）作为参数传递给执行异步操作的函数。当异步操作执行完毕的时候，将异步操作的结果作为回调函数的参数来调用回调函数。这样就可以实现异步编程了。

![](http://o7yupdhjc.bkt.clouddn.com/17-4-11/47666645-file_1491888076600_beb1.png)

由于异步执行的空间不再主程序（主线程），所以不会对主线程造成阻塞，这对于Web端的用户体验是尤为重要的。

### 例子

``` javascript

function f_callback(x, callback){
    setTimeout(() => {//模拟异步程序执行了2s
        callback(x * x);
    }, 2000)
}

f_callback(1, function(val){
    console.log(val);
})

```

### 优点

+   简单易懂

### 缺点

+   当异步处理嵌套过多时，容易产生回调地狱，代码可读性差

    ``` javascript

    f_callback(?, function(val){
        ...
        callback(val,function(val){
            ...
            callback(val,function(val){
                ...
                callback(val,function(val){
                    ...
                });
            });
        });
    })

    ```

## Promise

为了解决多层回调导致的回调地狱，聪明的程序员们想出了很多解决方法，`Promise` 便是成功的纳入到ES标准中的一个解决方法。

`Promise` 通过采用 `then()` 方法来将回调函数从异步嵌套中抽取出来，使的代码可读性更加直观。

同时可以通过在 `then()` 方法的中的 `onFulfilled()` 和 `onRejected()` 返回数据获得一个新的 `Promise` 来实现 `then()` 的链式调用。

如果返回的是一个 `Promise` 对象，那么接下来的 `then()` 是连接的返回的 `Promise` 对象。

在编写异步操作函数时，我们只需要返回一个 `Promise` 对象即可。

### 例子

``` javascript

function f_promise(x){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x * x);
        }, 2000)
    })
}

f_promise(2).then( val => {
    console.log(val);
})

```

### 优点

+   避免了回调地狱

    ``` javascript

    f_promise(?)
    .then(() => {
        return other_f_promise()
    })
    .then(() => {
        return other_f_promise()
    })
    .then(() => {
        return other_f_promise()
    })
    ...
    .catch(callback)

    ```

### 缺点

+   需要学习新的一个概念
+   降低了性能（这也是不可避免的嘛）


### 参考资料

[MDN_Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Promise A+规范_英文](https://promisesaplus.com/)

[Promise A+规范_翻译](http://malcolmyu.github.io/malnote/2015/06/12/Promises-A-Plus/)


## Generator

`Generator` 其实只是一个可迭代的对象，它主要是用来控制 `Generator function` 的内部流程的，但是经过 **著名程序员 TJ Holowaychuk** 大佬的 [co模块](https://github.com/tj/co) 的改造后，便变成了一个很好用的异步编程的东西了。

这里就不详细讲述 `Generator` 的使用，简单的介绍一下 `co` 模块的实现方式。

`co` 只支持：

+   `promises`
+   `thunks (functions)`
+   `array (parallel execution)`
+   `objects (parallel execution)`
+   `generators (delegation)`
+   `generator functions (delegation)`

这样的 `yield` 数据。

因为也只是自动帮助你调用 `Generator` 的 `next` 方法，或者使用 `thunks` 帮你调用回调，

手写的方式就是下面这种方式(可以看到手写还不如直接Promise)：

### 例子

``` javascript

function * f_generator(x){

    yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x * x);
        }, 2000)
    })

    yield function f_trunk(callback){
        setTimeout(() => {
            callback(2);
        }, 2000)
    }
    console.log(y);
}

let g=f_generator(3);
g.next().value.then( val => {
    console.log(val);
    g.next().value(val => {
        console.log(val);
    })
});

```

### 优点

+   结合 `co` 模块还是很好用的

### 缺点

+   这本来就不是干异步处理的！

### 参考资料

[Co 模块](https://github.com/tj/co)

[MDN_Generator](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)

## async/await

`async/await` 是ES7中提出的一个异步解决方法，目前只能使用 JS转换器(babel) 或者 nodejs(7.0+)来体验。

`async/await` 其实就是一个自动化执行 `Generator` 的语法糖（感觉就是学co出来的），但是其语义性更强。

`async` 函数会返回一个 `Promise` 对象，当内部的执行完成时，触发这个 `Promise` 对象的 `onFulfilled`，传递函数的返回值。

`await` 会返回其后面的变量，如果是 `Promise` 对象，则会将`Promise` 对象的返回值赋出来。如果有错误则直接触发函数反悔的`Promise` 对象的 `onRejected`

### 例子

 这是内部正确的例子

``` javascript

async function f_async_await(x){
    let y =await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x * x);
        }, 2000)
    })
    return y;
}

f_async_await(4).then( val => {
    console.log(val);//9
}).catch(val => {
    console.log(val);
})

```

 这是内部有错的例子

``` javascript

async function f_async_await(x){
    let y =await new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(x * x);
        }, 2000)
    })

    let y =await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x * x);
        }, 2000)
    })

    return y;
}

f_async_await(3).then( val => {
    console.log(val);
}).catch(val => {
    console.log(val+'123');//9123
})

```

### 优点

+   语义明确：将异步的写法，使用类似同步的方法编写出来

### 缺点

+   有学习成本：需要接纳新的知识，且必须知道Promise

### 参考资料

[阮一峰_ECMAScript 6 入门_async](http://es6.ruanyifeng.com/#docs/async)

-----

## 结尾

其实所有的异步都是基于callback的思想，可能还有什么事件机制，监听订阅等等，但是它们都是通过调用预先设定好的方法来实现，其实和callback区别不大。

我们改善的都是编写方式，如何更加简单明了方法来编写出更加复杂的功能，才是我们所需要去开拓的。`Promise` 解决了回调地狱、`async/await` 使我们可以使用同步的方式去异步编程。都是为了代码更加可读，以及编码更加快捷，这也许就是程序之美的所在~~

## END

>   2017-4-11 完成

>   2017-4-11 立项
