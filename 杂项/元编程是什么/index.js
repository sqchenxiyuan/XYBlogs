class A{
    constructor(){
        if(new.target === A){
            this.x = 1
            this.y = 1
        } else {
            this.z = 2
        }
    }
}

class B extends A{
    constructor(){
        super()
    }
}

let a = new A()
let b = new B()

console.log(JSON.stringify(a))
console.log(JSON.stringify(b))