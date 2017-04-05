Promise.prototype.and=function(){
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

function getTimeRandomPromise(val){
    return new Promise( (resolve,reject) => {
        //dosomething
        setTimeout(()=>{
            resolve(val)
            console.log('end '+val,new Date().getTime())
        },Math.random()*1000)
    })
}

let a=getTimeRandomPromise('a'),
    b=getTimeRandomPromise('b'),
    c=getTimeRandomPromise('c'),
    d=getTimeRandomPromise('d'),
    e=getTimeRandomPromise('e'),
    f=getTimeRandomPromise('f');


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

a.and(b).or(c,d).or(e,f).then(val=>{
    console.log(val,new Date().getTime());
   //dosomething
});
