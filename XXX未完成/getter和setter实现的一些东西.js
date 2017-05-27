let z = {
    _num:[],
    set num(data){
        this._num.push(data)
    },
    get num(){
        return this._num.pop()
    }
}
z.num = 3;
z.num = 2;
z.num = 1;
z.num = 3;
z.num = 4;
z.num = z.num + z.num;
console.log(z.num)
