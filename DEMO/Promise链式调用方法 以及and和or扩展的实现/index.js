Promise.prototype.and=function(){
    let promises=[...arguments];
    for(let i=0;i<promises.length;i++){
        if(!(promises[i] instanceof Promise)){
            console.error('错误的promise')
            return void(0)
        }
    }

    return Promise.all([this].concat(promises)).then( val => {
        return Promise.resolve(val.reduce( (l,data) => {
            if(Array.isArray(data)){
                l=l.concat(data)
            }else{
                l.push(data)
            }
            return l
        },[]))
    });

}

Promise.prototype.or=function(promise){
    let promises=[...arguments];
    for(let i=0;i<promises.length;i++){
        if(!(promises[i] instanceof Promise)){
            console.error('错误的promise')
            return void(0)
        }
    }

    return Promise.race([a,b]).then( val => {
        return Promise.resolve(val.reduce( (l,data) => {
            if(Array.isArray(data)){
                l.concat(data)
            }else{
                l.push(data)
            }
            return l
        },[]))
    });

}

let a=new Promise( (resolve,reject) => {

    setTimeout(()=>{
        resolve('a')
    },1000)

})

let b=new Promise( (resolve,reject) => {

    setTimeout(()=>{
        resolve('b')
    },2000)

})

let c=new Promise( (resolve,reject) => {

    setTimeout(()=>{
        resolve('c')
    },3000)

})


// let d=Promise.all([a,b,c]).then( val => {
//     console.log(val);
// });
//
// let e=Promise.race([a,b,c]).then( val => {
//     console.log(val);
// });

a.and(b,c).then( val => {
    console.log(val);
});
