# 简单插件系列(1)——AJAX插件

自己在写一些小项目时，总是经常会使用AJAX请求,每次用原生的很蛋疼，又不想引入JQ库，于是这里我根据JQuery的函数的传参和效果，利用原生JS仿写一套简单AJXA插件。

---
## 原生JS发送AJAX请求

### 简介

AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。
AJAX可以允许网页异步与服务器进行数据交换，是一个使用频率很高的技术，所以我们需要将他封装成一个简单的方法，方便调用。

而且现在基本主流的浏览器都支持:

![](http://o7yupdhjc.bkt.clouddn.com/16-9-16/93876512.jpg)

### 使用

#### 建立AJAX对象

使用AJAX需要先建立一个AJAX请求对象:XMLHttpRequest

(现在浏览器主要都是内建的这个对象，IE5,6为ActiveXObject，基本已被淘汰，不考虑这个)

``` javascript
  var req=new XMLHttpRequest();
```

#### 设置响应事件

使用AJAX的时候我们可能需要监听一些事件，比如AJAX请求完成等。

我们使用设置onreadystatechange这个方法来实现，这个方法会在AJAX的状态变化时发生改变。它的状态是XMLHttpRequest对象的 **readyState** 属性保存的。

数值对应的状态

> 0: 请求未初始化
>
> 1: 服务器连接已建立
>
> 2: 请求已接收
>
> 3: 请求处理中
>
> 4: 请求已完成，且响应已就绪

例如设置一下代码可以监听AJAX完成事件

``` javascript
  req.onreadystatechange=function(){
    if(req.readyState==4)
    {
      //填写AJAX完成后的事件
    }
  };
```
#### 设置请求信息

在XMLHttpRequest中我们可以使用 **open** 方法来设置主要信息

``` javascript
  req.open(reqMethod,reqURL,reqAsync);
  //reqMethod:为请求方式 如:POST，GET等
  //reqURL:为请求的路径，可以是相对的也可以是绝对的
  //reqAsync:请求为异步还是同步，默认为TURE:同步
```

同时我们也可以使用XMLHttpRequest中得 **setRequestHeader** 方法来设置头信息

``` javascript
  req.setRequestHeader(header,value);
  //header:请求头的头名
  //value:相对于头名的值
```

#### 发生请求和数据

当所有必要的信息设置完以后我们可以使用 **send** 方法来发送请求

``` javascript
  req.send(reqData);
  //reqData:发生的数据，为string类型
```

#### 获取服务器返回的状态和数据

AJAX一般是用来获取后台的数据，然后反馈给用户，所以我们需要获取数据。

在AJAX执行完了后，数据和状态直接存放在XMLHttpRequest对象的 **status** 和 **responseText** 里。

>status:服务器返回的状态，一般成功为200 失败为404
>
>responseText:为返回的数据，如果为JSON，依然需要转化为JS对象

## 封装的的插件

### AJAX(obj)

这个是基础方法，后面会基于这个方法扩展多个方法。

``` javascript
/*
  obj选项：
  必选： reqURL:请求地址    
  可选： reqMethod:请求方法  默认:GET
        reqAsync:请求异同步 默认:异步
        reqData:请求数据    默认:空
        reqHeader:请求头    默认为空   传入JS对象即可
        reqSuccess(data):请求成功时间函数   传入返回的数据
        reqError():请求失败时的响应函数
        reqBefore:发送请求前的函数
*/
function ajax(obj){
  var reqURL=obj.reqURL;
  var reqMethod=obj.reqMethod||"get";
  var reqAsync=obj.reqAsync||true;
  var reqData=obj.reqData||"";//直接传数据不解析
  var reqHeader=obj.reqHeader;
  var reqSuccess=obj.reqSuccess;
  var reqError=obj.reqError;
  var reqBefore=obj.reqBefore;

  var req=new XMLHttpRequest();
  req.onreadystatechange=function(){
    if(req.readyState==4)
    {
      if(req.status==200){
        if(reqSuccess)reqSuccess(req.responseText);
      }else{
        if(reqError)reqError(req.responseText);
      }
    }
  };
  req.open(reqMethod,reqURL,reqAsync);
  if(reqHeader){
    for(var head in reqHeader){
      req.setRequestHeader(head,reqHeader[head]);
    }
  }
  if(reqBefore)reqBefore();
  req.send(reqData);
}
```

## 版本
还在修改中，在学习和开发过程中遇到问题会及时修正和更新~~

>V 0.1.4 --- 2016/9/16
