# Promise方法的扩展和实现

Promise作为ES6中用于处理编写异步代码的一个新的对象，使JS的异步代码可读性更高，并且ES6提供了all以及race函数用于处理一些常见的异步情况。但是格式使代码不够连续，这篇文章将讲述对Promise链式调用的方法的简单实现。

## ES6规定的方法

ES6提供了 `all` 和 `race` 方法来处理一些简单的。

### Promise.all()

`Promise.all()` 函数是将可迭代参数中的 promises 打包在一起，当其中全部完成时才触发 `onFulfilled`，返回与可迭代参数中的 promises 结构对应的由各个promise的返回值构成的数据，当有一个失败时触发 `onRejected`，返回错误的promise的返回值。

比如当希望两个异步同时完成时在执行接下来的任务，那么就可以使用 `Promise.all()`

``` javascript

let a=new Promise( (resolve,reject) => {
    //dosomething
    resolve('a')
    console.log('end a',new Date().getTime())
})

let b=new Promise( (resolve,reject) => {
    //dosomething
    setTimeout(()=>{
        resolve('b')
        console.log('end b',new Date().getTime())
    },1000)
})

let testall=Promise.all([a,b]).then( val => {
    console.log(val,new Date().getTime());
    //dosomething
});

```

![](http://i1.piimg.com/567571/cc4b1965459ee685.png)

这样就可以在两个异步处理执行完后运行，再继续运行需要的代码。

### Promise.race()

`Promise.race()` 与 `Promise.all()` 相对应。

`Promise.race()` 函数是在可迭代参数中的 promises 有一个 promise 完成时便触发 `onFulfilled`，返回这个第一个完成的 promise 的值，当有一个失败时触发 `onRejected`，返回错误的promise的返回值。

``` javascript

let a=new Promise( (resolve,reject) => {
    //dosomething
    resolve('a')
    console.log('end a',new Date().getTime())
})

let b=new Promise( (resolve,reject) => {
    //dosomething
    setTimeout(()=>{
        reject('b')
        console.log('end b',new Date().getTime())
    },1000)
})

let testrace=Promise.race([a,b]).then( val => {
     console.log(val,new Date().getTime());
     //dosomething
});

```

![](http://i2.muimg.com/567571/20267fd1c1991964.png)

可以看到当 `a` 完成时， `testrace` 便执行了。并且 `b` 报错也不会再触发 `onRejected`

-----

这就是ES6提出的两个方法了（ps： `resolve` 和 `reject` 只是简单的两种种状态的封装，并没有对一些特殊的异步处理环境提供太多的帮助）。

## 可能需要的方法

PS:这些方法的需求完全由个人看法而想出来的，不是一定需要这样， `Promise.race()` 与 `Promise.all()` 两种方法就已经可以很好的处理一些异步请求间的关系了。

### 链式调用

当 `Promise.race()` 与 `Promise.all()` 需要混用时代码将变得冗余

``` javascript

let a=new Promise( (resolve,reject) => {
    //dosomething
    resolve(['a1','a2'])
    console.log('end a',new Date().getTime())
})

let b=new Promise( (resolve,reject) => {
    //dosomething
    setTimeout(()=>{
        resolve('b')
        console.log('end b',new Date().getTime())
    },1000)
})

let c=new Promise( (resolve,reject) => {
    //dosomething
    setTimeout(()=>{
        resolve('c')
        console.log('end c',new Date().getTime())
    },1000)
})

let d=Promise.all([a,b]);

let e=Promise.race([d,c]);

e.then(val=>{
    console.log(val,new Date().getTime());
   //dosomething
});

```

这里为何不能使用链式的方法呢？为何不能写成这样的方式？

``` javascript

a.all(b).race(c).then(val=>{
    console.log(val,new Date().getTime());
   //dosomething
});

```

#### all的链式实现 and()

``` javascript

这个函数会将参数中的 `promise` 和 `function` 转化出来的 `promise` 与调用该函数的 `promise` 使用 `all` 合并在一起;

Promise.prototype.all=function(){
    let promises=[...arguments];
    for(let i=0;i<promises.length;i++){
        if(!(promises[i] instanceof Promise)){
            if(typeof promises[i] === 'function'){
                promises[i]=new Promise(promises[i]);
            }else{
                console.error('错误的promise')
                return void(0)
            }
        }
    }

    return Promise.all([this].concat(promises))
}

```

#### race的链式实现 or()

``` javascript

Promise.prototype.or=function(promise){
    let promises=[...arguments];
    for(let i=0;i<promises.length;i++){
        if(!(promises[i] instanceof Promise)){
            if(typeof promises[i] === 'function'){
                promises[i]=new Promise(promises[i]);
            }else{
                console.error('错误的promise')
                return void(0)
            }
        }
    }

    return Promise.race([new Promise( (res,rej)=>{//增加一层来使两个Promise在同一层级
        this.then(val=>{
            res(val)
        });
    }),Promise.all(promises)])
}

```

## 参考资料

[MDN_Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

[Promise A+规范_英文](https://promisesaplus.com/)

[Promise A+规范_翻译](http://malcolmyu.github.io/malnote/2015/06/12/Promises-A-Plus/)

## END

>   2017-4-1    立项
