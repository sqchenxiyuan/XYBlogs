# WebSocketAPI结构设计以及实现-客户端

前面我写了一篇《WebSocket简介以及简单的应用》文章，主要讲解了的主要使用API，但是我们会发现只是简单的一个功能就让代码的编写变得很复杂，其中有一些可以提取出来的方式方法我们可以封装起来将对WebSocketAPI的调用封装起来，通过使用发布订阅模式暴露一些API实现请求的分发，这篇文章将讲述一个简单的WebSocket请求格式，前后端同时依据该格式就可以实现更好的WebSocketAPI开发。

## 直接的WebSocketAPI编写方式

我们直接的WebSocketAPI编写方式，特别是在功能简单的时候，我们可能是直接通过WebSocket的API进行通信，比如上次的DEMO中

``` Javascript

ws.onmessage=function(event){
    var data=JSON.parse(event.data);
    var type=data.type||0;
    var msg=data.msg||'';
    var date=data.date||new Date();

    var p=document.createElement('p');
    p.innerHTML=msg;

    switch (type){
     case 0:p.className="messageBox-sys";break;
     case 1:p.className="messageBox-other";break;
     default:p.className="messageBox-sys";
    }

    document.getElementById('messageBox').appendChild(p);
}

```

我们直接监听 `WebSocket` 对象的message事件，然后判断其中的数据来进行相应的操作，在简单的工程中可能这样是很方便的，但是在复杂的工程中我们重复的进行判断，将浪费资源，并且如果数据格式不统一，判断将会变得特别复杂。

### 优点

1.  简单功能编写方便，无额外引用资源

### 缺点

1.  代码重复编写
2.  数据格式不统一会导致判断复杂，代码可读性低
3.  耦合度较高

## WebSocket需要封装请求方式

由于WebSocket是基于长连接的方式，请求占用的是同一个通道，导致其请求方式不再是和AJAX那样的HTTP请求方式相同，不再是一应一答的方式。

为此我们首先就需要一个监听服务器数据传送回来的方法，类似 `onmessage`，然后我们需要一个发送数据的方式类似 `send`，这样一个基本的WebSocket的封装需要的API就出来。

但是这两个API只是基本的功能，对于一些常用特殊需求我们可能需要提供一些特殊的方式，

比如我需要让响应回答指定请求，然后返回给我指定请求的响应结果，而且这个回应是混杂在其他类似请求中的。（HTTP请求方式）

在加上连接和关闭两个方式，于是我们就有了需要的最基础的4个API+1个扩展性的API

1.  connect 连接
2.  listen  监听服务器响应
3.  send    发送数据
4.  vhttp   模拟HTTP请求，实现一应一答
5.  close   关闭连接

## API的实现

### 数据格式

#### 请求标识 type

我们需要对请求进行分发当然需要一个标识来表示这个请求的类型，类似 `Socket.IO` 中的不同连接空间。

这里我们通过添加一个简单的Type来实现，比如

``` javascript

{
    type:"req type"
}

```

这就是一个简单的请求格式，请求的标识为 `req type` 的服务器服务。

#### 数据标识 data

请求的数据需要放置与专门的数据存储区域防止与标识区域的数据冲突，

比如

``` javascript

{
    type:"req type",
    msg:"this is message"
}

```

这样是不行的，因为可能 `msg` 标识会与将来的扩展冲突，数据需要放置到 `data` 标识区域内，而且建议数据在流式数据格式中最后，基本和HTTP保持相似的结构。

``` javascript

{
    type:"req type",
    data:{
        msg:"this is message"
    }
}

```

#### 特殊标识

只是类型和数据是不能完全满足需求的，就像HTTP的header一样，用于实现一些特殊的功能。

例如我们需要模拟一应一答的请求就需要添加一个 `key` 来分辨请求。依据key来分辨请求是否为目标的答应。

#### 注意

这里我的格式全采用的JSON格式，这不是固定的，只需要能将数据区分开，其他格式都是可以的。

### listen 监听服务器响应

这里我们只需要传入需要监听的响应类型以及响应函数就可以了

>   listen(type,callback)

我们只需要依据 `type` 将相应的函数存储到一个hashmap的对应 `type` 数组当中就可以了

``` javascript

let listenMap={};

function listen(type,callback){
    if(!listenMap[type])listenMap[type]=[];
    if(listenMap[type].indexOf(fun)!==-1)listenMap[type].push(fun);
}

```

### send 发送数据

这个函数只是负责发送数据，所以只需要传入请求类型和数据就可以了

>   send(type,data)

同时我们需要注意这时候内部的WebSocket的状态，如果未连接，需要尝试连接后在发送，在连接成功发送之前我们可以将数据存储到一个数组当中。

``` javascript

let ws=;//WebSocket连接
let dataList=[];

function send(type,data){
    data=JSON.stringify({//这里我采用JSON格式的解析方式
        type,
        data
    });

    if(!ws||ws.readyState>1){//WebSocket关闭
        connect();//重启连接WebSocket
        dataList.push(data)
    }else{
        ws.send(data);
    }
}

```

### vhttp 一应一答请求

这个请求其实就是将 `listen` 和 `send` 结合起来

>   vhttp(type,data,callback)

``` javascript

let ws=;//WebSocket连接
let dataList=[];
let keyMap={};

function vhttp(type,data){
    let key=Math.random()*1000000000;
    data=JSON.stringify({
        type,
        data,
        key
    });

    if(!ws||ws.readyState>1){//已关闭
        connect();
        dataList.push(data)
    }else{
        ws.send(data);
    }

    keyMap[key]=callback;
}

```

### 最终的类 WsCilent

有了上面的3个函数的需求我们就能快速的写出我们封装的构造函数。

``` javascript

class WsCilent{

    constructor(path,options){
        this.listenMap={};  //监听时间
        this.keyMap=[];     //监听VHTTP的函数
        this.dataList=[];   //待发送的数据

        this.ws=null;
        this.path=path;
        if(this.path)this.connect();
    }

    connect(path = this.path){
        if(!window.WebSocket){//判断WebSocket的
            console.error('当前环境，不支持WebSocket！');
            return false;
        }

        if(this.ws&&this.ws.readyState<=1&&(this.path===path||!path))return;
        this.path=path;

        let listenMap=this.listenMap;
        let keyMap=this.keyMap;
        let dataList=this.dataList;

        this.ws=new WebSocket(path);
        let ws=this.ws;

        ws.addEventListener('open',event => {

            dataList.forEach((data)=>{
              ws.send(data);
            });
            dataList=[];

        });

        ws.addEventListener('message',event => {
            let data=event.data;

            try{
                data=JSON.parse(data);
            }catch(e){
                console.info(e);
                data=event.data;
            }

            if(data.key&&keyMap[data.key]){
                let foo=keyMap[data.key];
                keyMap[data.key]=undefined;

                if(typeof foo === 'function')foo(null,data.data);
                return ;
            }

            if(listenMap[data.type]){
                listenMap[data.type].forEach((foo)=>{
                    if(typeof foo === 'function')foo(null,data.data);
                });
            }
        });

        ws.addEventListener('close',event => {
            for(let key in keyMap){
                if(typeof keyMap[key] === 'function')keyMap[key](event);
            }
            keyMap={};

            listenMap.forEach((foolist)=>{
                foolist.forEach((foo)=>{
                    if(typeof foo === 'function')foo(event);
                })
            });
        });

        ws.addEventListener('error',event => {

            for(let key in keyMap){
                if(typeof keyMap[key] === 'function')keyMap[key](event);
            }
            keyMap={};

            listenMap.forEach((foolist)=>{
                foolist.forEach((foo)=>{
                    if(typeof foo === 'function')foo(event);
                })
            });

            ws=null;
            window.alert('WebSocket连接出错');
        });
    }




}

```

## END

>   2017-3-8 立项
