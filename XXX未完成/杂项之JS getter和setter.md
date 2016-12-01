# 杂项之JS getter和setter 存取器属性

JS字面量定义数据时除了常用的键值对，还有一种是getter和setter，这篇文章主要就是讲述一下getter和setter的使用

## 简介

在JS中对象的属性都是由键、值、特性构成的。在 **ES5** 中，属性值可以由一个或者两个方法替代，这连个方法就是 **getter** 和 **setter**。由 **getter** 和 **setter** 定义的属性叫做 ***“存取器属性”***， 它不同于 “数据属性” ，数据属性只是简单的值。

同时，存取器属性是不可写的。是无法通过简单的赋值操作来完成的，因为对该属性的赋值操作是调用的方法。

## getter

getter方法是属性的读方法，当对属性进行读操作时，就会调用getter函数，返回函数返回的值。

如果只有setter方法，那么返回的属性就是 **undefined**。

``` javascript

var obj={
  _name:'123',
  set name(value){
    this._name=value;
  },
  get name(){
    return this._name;
  },
  get name2(){
    return 'hahh';
  }
};

console.log(obj.name);//123
console.log(obj.name2);//hahh

var obj={
  _name:'123',
  set name(value){
    this._name=value;
  }
};

console.log(obj.name);//undefined

```

## setter

getter方法是属性的写方法，当对属性进行写操作时，就会调用写函数，并且给函数传入写的数据。

如果只有getter方法，那么无法执行写操作，写操作没有用。

``` javascript

var obj={
  _name:'123',
  set name(value){
    this._name=value;
  },
  get name(){
    return this._name;
  }
};

console.log(obj._name);//123
obj.name='223'
console.log(obj._name);//223

var obj={
  _name:'123',
  get name(){
    return this._name;
  }
};

console.log(obj._name);//123
obj.name='223'
console.log(obj._name);//123

```

## 设置getter和setter的方法

### 字面量初始化

第一种就是在创建对象的时候通过 **set** 和 **get** 来设置。

``` javascript

var obj={
  _name:'123',
  set name(value){
    this._name=value;
  },
  get name(){
    return this._name;
  }
};

console.log(obj.name);//123
obj.name='223'
console.log(obj.name);//223

```

这个方法可读性很高，但是不灵活，必须代码写好。

### 通过设置属性特性

通过设置属性特性，可以动态添加一些存取器属性。

### [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

``` javascript

var obj=Object.create(Object.prototype,{
  _name:{
    value:'123'
  },
  name:{
    get:function(){
      return this._name;
    },
    set:function(value){
      this._name=value;
    }
  }
})

console.log(obj);//123
console.log(obj.name);//123
obj.name='223'
console.log(obj.name);//223

```

使用这种方式的好处是可配置性高，但初学者容易迷糊。

### [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

``` javascript

var obj={
  _name:'123'
}

Object.defineProperty(obj,'name',{
  get:function(){
    return this._name;
  },
  set:function(value){
    this._name=value;
  }
})

console.log(obj);
console.log(obj.name);//123
obj.name='223'
console.log(obj.name);//223

```

使用该方法可以随时的添加或修改。修改时就是需要使用这个方法。

### [Object.defineProperties()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)

``` javascript

var obj={
  _name:'123'
}

Object.defineProperties(obj,{
  name:{
    get:function(){
      return this._name;
    },
    set:function(value){
      this._name=value;
    }
  }
})

console.log(obj);
console.log(obj.name);//123
obj.name='223'
console.log(obj.name);//223

```

这个方法可以一次添加多个存取器属性。


### [Object.prototype.\_\_defineGetter\_\_()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineGetter__) 以及 [Object.prototype.\_\_defineSetter\_\_()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/__defineSetter__)

``` javascript

var obj={
  _name:'123'
}

obj.__defineGetter__('name',function(){
  return this._name;
});
obj.__defineSetter__('name',function(value){
  this._name=value;
})

console.log(obj);
console.log(obj.name);//123
obj.name='223'
console.log(obj.name);//223

```

这个方法你可以看成 **Object.defineProperty()** 的封装版。

## END

> 2016=12-1 完成
>
> 2016-11-27 立项
