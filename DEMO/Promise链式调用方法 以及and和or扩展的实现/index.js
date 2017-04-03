Promise.prototype.and=function(promise){
    if(!(promise instanceof Promise)){
        console.error('错误的promise')
        return void(0)
    }

    return Promise.all([a,b]).then( val => {
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

Promise.prototype.or=function(promise){
    if(!(promise instanceof Promise)){
        console.error('错误的promise')
        return void(0)
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


let d=Promise.all([a,b,c]).then( val => {
    console.log(val);
});

let e=Promise.race([a,b,c]).then( val => {
    console.log(val);
});

a.and(b).and(c).then( val => {
    console.log(val);
});
