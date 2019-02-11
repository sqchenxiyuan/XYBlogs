# JS节流和防抖

JS的节流和防抖主要用于处理高频度的操作，通过限制执行频率来防止页面处理的内容过多导致页面卡顿，这篇将简单实现节流和防抖的函数

## 节流

节流相当于节省流量，节省资源，主要的概念就是在一段时间内所有操作都只执行一次有效操作，例如监听滚动的事件，如果每次监听操作的内容很复杂需要的性能很多，那么如果每次滚动都执行一次，必然会导致页面卡顿、假死，节流就是防止这样的事情发生

例如下面的代码：

``` javascript
let fun = function(){
    console.log("我会消耗页面100ms的性能", Date.now(), count)
}

let count = 0
let handle = setInterval(_ => {
    fun()
    count++
}, 10)
setTimeout(_ => {
    clearInterval(handle)
}, 1000)
```

![](http://blog-cdn.chenxiyuan.fun/18-9-21/81639433.jpg)

结果会很悲伤，为此我们可以通过节流的方式来进行限制，也就是100ms内只执行一次

``` javascript
let fun_throttle = (function(){
    let flag = false

    return function(){
        if (flag) return
        flag = true

        console.log("我会消耗页面100ms的性能", Date.now(), count)
        
        setTimeout(_ => {
            flag = false
        }, 100)
    }
})()

let count = 0
let handle = setInterval(_ => {
    fun_throttle()
    count++
}, 10)
setTimeout(_ => {
    clearInterval(handle)
}, 1000)
```

![](http://blog-cdn.chenxiyuan.fun/18-9-21/49516254.jpg)

可以看到只有某些操作才正常执行了，有很多操作被忽略了

## 防抖

和节流类似，防抖是指在一段时间内执行操作，那么就会一直延长运行执行下一次操作的时间

``` javascript
let fun_debounce = (function(){
    let flag = false
    let handle = null

    return function(){
        if (handle) clearTimeout(handle)
        handle = setTimeout(_ => {
            flag = false
        }, 100)

        if (flag) return
        flag = true

        console.log("我会消耗页面100ms的性能", Date.now(), count)
    }
})()

let count = 0
let handle = setInterval(_ => {
    fun_debounce()
    count++
}, 10)
setTimeout(_ => {
    clearInterval(handle)
}, 1000)
```

![](http://blog-cdn.chenxiyuan.fun/18-9-21/16618706.jpg)

可以看到函数只执行了第一次，后面的操作由于时间间隔太短都被忽略了

## 函数封装

防抖和节流的概念很好理解，但是如果需要防抖和节流的地方都和上面写的一样，就很麻烦，所以可以将防抖和节流抽取成函数，将传入的函数进行处理就行了

### 防抖函数

``` javascript
/**
 * 节流函数
 * @param {*} fun 需要节流的函数
 * @param {*} time 节流时间间隔
 * @param {*} first 节流函数在节流时间间隔内是执行第一个还是最后一个
 */
function throttle(fun, time = 10, first = true){
    if (first){
        let flag = false
    
        return function(){
            if (flag) return
            flag = true

            let that = this
            let args = arguments
            fun.apply(that, args)

            setTimeout(_ => {
                flag = false
            }, time)
        }
    } else {
        let flag = false
        let that = null
        let args = null
    
        return function(){
            if (flag) {
                that = this
                args = arguments
                return
            }
            flag = true

            setTimeout(_ => {
                fun.apply(that, args)
                flag = false
            }, time)
        }
    }
}
```

### 防抖函数

``` javascript
/**
 * 函数防抖封装函数
 * @param {*} fun 需要防抖的函数
 * @param {*} time 防抖时间间隔
 * @param {*} first 函数在一次的防抖时间内是执行第一个还是最后一个
 */
function debounce(fun, time = 10, first = true){
    if (first){
        let flag = false
        let handle = null

        return function(){
            if (handle) clearTimeout(handle)
            handle = setTimeout(_ => {
                flag = false
            }, time)

            if (flag) return
            flag = true

            let that = this
            let args = arguments
            fun.apply(that, args)
        }
    } else {
        let flag = false
        let handle = null
    
        return function(){
            if (handle) clearTimeout(handle)

            let that = this
            let args = arguments
            handle = setTimeout(_ => {
                flag = false
                fun.apply(that, args)
            }, time)

            if (flag) return
            flag = true
        }
    }
}
```

### 效果

节流和防抖展示效果如下

``` javascript
let fun1 = function(count){
    console.log("我会消耗页面100ms的性能:节流先执行", Date.now(), count)
}

let fun2 = function(count){
    console.log("我会消耗页面100ms的性能:节流后执行", Date.now(), count)
}

let fun3 = function(count){
    console.log("我会消耗页面100ms的性能:防抖先执行", Date.now(), count)
}

let fun4 = function(count){
    console.log("我会消耗页面100ms的性能:防抖后执行", Date.now(), count)
}

let throttle1 = throttle(fun1, 100, true)
let throttle2 = throttle(fun2, 100, false)
let debounce1 = debounce(fun3, 100, true)
let debounce2 = debounce(fun4, 100, false)

let count = 0
let handle = setInterval(_ => {
    throttle1(count)
    throttle2(count)
    debounce1(count)
    debounce2(count)
    count++
}, 10)
setTimeout(_ => {
    clearInterval(handle)
}, 1000)
```

![](http://blog-cdn.chenxiyuan.fun/18-9-21/24133946.jpg)

## END

>   2018-09-21 15:50:44  完成
> 
>   2018-08-03  立项