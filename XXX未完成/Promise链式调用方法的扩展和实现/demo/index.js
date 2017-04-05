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

    return Promise.race([new Promise( (res,rej)=>{
        this.then(val=>{
            res(val)
        });
    }),Promise.all(promises)])
}

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
        // resolve('c')
        reject('c');
        console.log('end c',new Date().getTime())
    },2000)
})


// let testall=Promise.all([a,b]).then( val => {
//     console.log(val,new Date().getTime());
//     //dosomething
// });

// let testrace=Promise.race([a,b]).then( val => {
//      console.log(val,new Date().getTime());
//      //dosomething
// });

// let d=Promise.all([a,b]);
//
// let e=Promise.race([d,c]);
//
// e.then(val=>{
//     console.log(val,new Date().getTime());
//    //dosomething
// });

a.all(b).race(c).then(val=>{
    console.log(val,new Date().getTime());
   //dosomething
});
