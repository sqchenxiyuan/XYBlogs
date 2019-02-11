# WebSocket简介以及简单的应用

WebSocket是HTML5的一个新特性提供了浏览器端和服务器端双向实时通信的能力，用于实现一些实时在线的应用，这篇文章将简单介绍WebSocket的使用，并实现一个简单的在线聊天的功能。

## WebSocket简介

### WebSocket与HTTP

WebSocket与HTTP都是一种协议，但是HTTP是一应一答的，无论是 HTTP 1.0 还是 HTTP 1.1，它们都需要浏览器端发出请求（request）后才能让服务器返回响应（respones），在需要实时通讯的应用时，比如在线聊天，在线游戏等，过去只能使用轮询的方式来获取最新的消息，这样会消耗大连的网络资源。

但是有了WebSocket之后，我们可以让浏览器端和服务器端建立一个持久的双向通讯连接，在有新数据的时候自动发送并接收，减少请求的数量，节省网络资源。

### HTML5的WebSocket

在HTML5中我们可以使用 `WebSocket` 对象来连接WebSocket服务器

> var ws=new WebSocket(URL,protocols);

|参数名|参数描述|
|:---|:---|
|URL|需要连接的地址|
|protocols|（可选）可以是一个单个的协议名字字符串或者包含多个协议名字字符串的数组。|

当构建成功时会返回一个WebSocket对象，失败时返回错误。

WebSocket对象提供了2个方法：

1.  void close(in optional unsigned long code, in optional DOMString reason);

    这个方法用于关闭WebSocket连接。

    |参数名|参数描述|
    |:---|:---|
    |code|关闭连接的状态号，默认为1000（正常关闭）|
    |reason|一个字符串，用于描述关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本|

    [code状态码列表](https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent)

2.  void send(in DOMString data);

    这个方法用于像服务端发送数据。

    |参数名|参数描述|
    |:---|:---|
    |data|发送的数据|

这两个方法是有浏览器主动执行，服务器发过来的消息需要通过监听事件来实现。

WebSocket对象有4个事件:

1.  open事件

    当连接成功连接时会触发该事事件，会传入一个Event对象

2.  message事件

    当接收到消息时会触发该事件，会传入一个Event对象,并且可以通过Event对象data属性获得数据

3.  error事件

    当连接出错时会触发该事事件，并传入一个Event对象

4. close事件

    当连接关闭的时候会触发该事件，并传入一个Event对象

=、=有了API下面肯定就是要撸起袖子搞一波啦~~~

## WebSocket的简单应用-在线简易聊天室

### 服务器的搭建

在这里我使用nodejs搭建服务器，毕竟咋们是学前端嘛=、=

能搭建Websocket服务器的包有很多,这里我们选用 [ws](https://github.com/websockets/ws) ,因为这个包是十分基础的一个，同时API也与W3C的规范差不多，方便理解。

sever.js

``` javascript

var path=require('path');
var http=require('http');
var express=require('express');
var ws=require('ws');

var app=express();
app.use(express.static(path.join(__dirname, './public')));

var server=app.listen(3000,()=>{
  console.log('服务器启动');
});

var io=new ws.Server({server});
io.on('connection',function(client){

  client.on('message',function(data){
    console.log(data);
  });
  client.on('close',function(data){
    console.log(data);
  });

  setTimeout(function() {
    if(client.readyState===1){//防止已断开连接
      client.send('来之服务器的消息');
    }
  }, 1000);

});

```

这段代码我们就简单的搭建了一个websokect服务器，我们可以从代码中看出，服务器在websokect连接上后，会输出 `message` 和 `close` 请求的信息，并且我们在连接后会向浏览器发送一条消息。

下面是我们浏览器的JS

``` javascript

var ws=new WebSocket('ws://127.0.0.1:3000/');

ws.onopen=function(event){
 console.log('连接成功');
 ws.onmessage=function(event){
   console.log('收到消息：'+event.data);
 }
 ws.onclose=function(event){
   console.log('连接关闭');
 }

  ws.send('来自浏览器的消息');

};
ws.onerror=function(event){
  console.log('连接出错');
};

```

我们将这段代码加入到服务器public目录的index.html文件中，然后访问 `localhost:3000` 查看浏览器和服务器控制台

服务器控制台

![](http://blog-cdn.chenxiyuan.fun/17-3-5/19966393-file_1488695396331_14e99.png)

浏览器控制台

![](http://blog-cdn.chenxiyuan.fun/17-3-5/95213212-file_1488695324279_f4c3.png)

我们可以看到WebSocket服务器已经成功的运行了起来

### 简易聊天室的实现

我们这里只实现一个简单的聊天室的功能，发送和接受以及展示。

首先我我们把聊天室的页面进行简单的编写，实现简单的样式

``` html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>websokect简易聊天室</title>
  <style>
    .messageBox{
      background: lightslategrey;
    }

    p{
      font-size: 16px;
      margin: 5px;
    }

    .messageBox-sys{
      text-align: center;
      color:yellow
    }

    .messageBox-other{
      text-align: left;
      color:black;
    }

    .messageBox-my{
      text-align: right;
      color:white;
    }

    input{
      height: 20px;
      margin: 3px;
      border: 1px;
    }

  </style>
</head>
<body>
  <div style="width:60%;margin:0 auto;background: grey">
    <div id="messageBox" class="messageBox">
      <p class="messageBox-sys">系统消息</p>
      <p class="messageBox-other">别人的消息</p>
      <p class="messageBox-my">我的消息</p>
    </div>
    <div class="control">
      <div style="margin: auto;width: 80%;position: relative">
        <input id="message" style="width: 70%" type="" name="" placeholder="输入聊天内容" value="">
        <input id="btn-send" style="width:20%" type="button" value="发送">
      </div>
    </div>
  </div>
</body>
</html>

```

![](http://blog-cdn.chenxiyuan.fun/17-3-5/34829119-file_1488697505024_9c9a.png)

我们在这里使用JSON格式的数据进行数据发送，包含文本内容和发送时间

``` javascript

document.getElementById('btn-send').addEventListener('click',sendMessage);
function sendMessage(){
  if(ws.readyState!==1){
    alert('连接为建立');
    return;
  }

  var msg=document.getElementById('message').value;
  ws.send(JSON.stringify({
    msg:msg,
    date:new Date().getTime()
  }));

  var p=document.createElement('p');
  p.innerHTML="msg";
  p.className="messageBox-my";
  document.getElementById('messageBox').appendChild(p);
}

```

然后监听服务器发回的消息

``` javascript

ws.onmessage=function(event){
  var data=event.data;
  var type=data.type||0;
  var msg=data.msg||'';
  var date=data.date||new Date();
}

```

页面写好了，我们只需要服务器简单处理下就可以了

服务器需要实现

1.  收到消息转发给别人

2.  当有人加入/离开时进行提示

我们只需要一个数组存储好加入进来的每个连接，我们就可以进行统一的转发和处理。

当一个新的连接加入时，我们就可以遍历数组向其他连接发送消息。

``` javascript

var linkarr=[];

function join(client){

  linkarr.forEach((pepole)=>{
    pepole.send(JSON.stringify({
      type:0,
      msg:"有新的成员加入！现在聊天室有 "+(linkarr.length+1)+" 个人",
      date:new Date().getTime()
    }));
  });

  client.send(JSON.stringify({
    type:0,
    msg:"欢迎加入！现在聊天室有 "+(linkarr.length+1)+" 个人",
    date:new Date().getTime()
  }));

  linkarr.push(client);

}

```

同理离开和发送信息时也一样

``` javascript

function leave(client){

  var index=linkarr.indexOf(client);
  linkarr.splice(index,1);
  linkarr.forEach((pepole)=>{
    pepole.send(JSON.stringify({
      type:0,
      msg:"有一位成员离开！现在聊天室有 "+(linkarr.length)+" 个人",
      date:new Date().getTime()
    }));
  });
}

function sendData(client,data){

  linkarr.forEach((pepole)=>{
    if(pepole===client)return;
    pepole.send(JSON.stringify({
      type:1,
      msg:data.msg,
      date:data.date
    }));
  });
}

```

然后在我们的需要调用函数的地方加上，我们的服务器就完成啦！！！

``` javascript

var path=require('path');
var http=require('http');
var express=require('express');
var ws=require('ws');

var app=express();
app.use(express.static(path.join(__dirname, './public')));

var server=app.listen(3000,()=>{
  console.log('服务器启动');
});

var io=new ws.Server({server});

var linkarr=[];

io.on('connection',function(client){
  join(client);

  client.on('message',function(data){
    sendData(client,JSON.parse(data));
  });
  client.on('close',function(data){
    leave(client);
  });

});

function join(client){

  linkarr.forEach((pepole)=>{
    pepole.send(JSON.stringify({
      type:0,
      msg:"有新的成员加入！现在聊天室有 "+(linkarr.length+1)+" 个人",
      date:new Date().getTime()
    }));
  });

  client.send(JSON.stringify({
    type:0,
    msg:"欢迎加入！现在聊天室有 "+(linkarr.length+1)+" 个人",
    date:new Date().getTime()
  }));

  linkarr.push(client);
}

function leave(client){

  var index=linkarr.indexOf(client);
  linkarr.splice(index,1);

  linkarr.forEach((pepole)=>{
    pepole.send(JSON.stringify({
      type:0,
      msg:"有一位成员离开！现在聊天室有 "+(linkarr.length)+" 个人",
      date:new Date().getTime()
    }));
  });
}

function leave(client){

  var index=linkarr.indexOf(client);
  linkarr.splice(index,1);

  linkarr.forEach((pepole)=>{
    pepole.send(JSON.stringify({
      type:0,
      msg:"有一位成员离开！现在聊天室有 "+(linkarr.length)+" 个人",
      date:new Date().getTime()
    }));
  });
}

function sendData(client,data){

  linkarr.forEach((pepole)=>{
    if(pepole===client)return;
    pepole.send(JSON.stringify({
      type:1,
      msg:data.msg,
      date:data.date
    }));
  });

}

```

同理我们的页面也能快速的写出来

``` html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>websokect简易聊天室</title>
  <style>
    .messageBox{
      background: lightslategrey;
    }

    p{
      font-size: 16px;
      margin: 5px;
    }

    .messageBox-sys{
      text-align: center;
      color:yellow
    }

    .messageBox-other{
      text-align: left;
      color:black;
    }

    .messageBox-my{
      text-align: right;
      color:white;
    }

    input{
      height: 20px;
      margin: 3px;
      border: 1px;
    }

  </style>
</head>
<body>
  <div style="width:60%;margin:0 auto;background: grey">
    <div id="messageBox" class="messageBox">
    </div>
    <div class="control">
      <div style="margin: auto;width: 80%;position: relative">
        <input id="message" style="width: 70%" type="" name="" placeholder="输入聊天内容" value="">
        <input id="btn-send" style="width:20%" type="button" value="发送">
      </div>
    </div>
  </div>
  <script type="text/javascript">
    var ws=new WebSocket('ws://127.0.0.1:3000/');
    ws.onopen=function(event){
      console.log('连接成功');

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

      ws.onclose=function(event){
        console.log('连接关闭');
      }

    };
    ws.onerror=function(event){
       console.log('连接出错');
    };


    document.getElementById('btn-send').addEventListener('click',sendMessage);
    function sendMessage(){
      if(ws.readyState!==1){
        alert('连接为建立');
        return;
      }

      var msg=document.getElementById('message').value;
      ws.send(JSON.stringify({
        msg:msg,
        date:new Date().getTime()
      }));

      var p=document.createElement('p');
      p.innerHTML=msg;
      p.className="messageBox-my";
      document.getElementById('messageBox').appendChild(p);
    }


  </script>
</body>
</html>


```

于是很简单的就完成了一个在线的简易聊天室，=、=下面是一些简单的效果结果

![](http://blog-cdn.chenxiyuan.fun/17-3-5/91765873-file_1488699875292_4f61.png)

![](http://blog-cdn.chenxiyuan.fun/17-3-5/11970768-file_1488699996497_8b64.png)

详细DEMO可以查看参考资料

## 后记

这个DEMO的功能做的很简单，离正真的聊天室功能还差很多，但是。。。不然为嘛叫DEMO呢=、=

有兴趣的话我会慢慢完善功能-、-，所不定我会挂在上我的博客~~~~

啦啦啦

## 参考资料

[MDN_WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

[DEMO地址](https://github.com/sqchenxiyuan/CUI/tree/master/XYBlog-DEMO/WebSocket%E7%AE%80%E4%BB%8B%E4%BB%A5%E5%8F%8A%E7%AE%80%E5%8D%95%E7%9A%84%E5%BA%94%E7%94%A8)

## END

> 2017-3-5 立项并完成