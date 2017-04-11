//callback
function f_callback(x, callback){
    setTimeout(() => {
        callback(x * x);
    }, 2000)
}

// f_callback(1, function(val){
//     console.log(val);
// })


//promise
function f_promise(x){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x * x);
        }, 2000)
    })
}

// f_promise(2).then( val => {
//     console.log(val);
// })

//generator



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

// let g=f_generator(3);
// g.next().value.then( val => {
//     console.log(val);
//     g.next().value(val => {
//         console.log(val);
//     })
// });



//async/await
async function f_async_await(x){
    let y =await new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(x * x);
        }, 2000)
    })

    y =await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x * x);
        }, 2000)
    })

    return y;
}

f_async_await(3).then( val => {
    console.log(val);
}).catch(val => {
    console.log(val+'123');//16123
})
