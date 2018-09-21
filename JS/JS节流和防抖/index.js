let fun = function(){
    console.log("我会消耗页面100ms的性能", Date.now(), count)
}

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

/**
 * 函数节流封装函数
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