# 函数封装之AJAX

自己在写一些小项目时，总是经常会使用AJAX请求,每次用原生的很蛋疼，又不想引入JQ库，于是这里我根据JQuery的函数的传参和效果，利用原生JS仿写一套简单AJXA插件。

---
## 原生JS发送AJAX请求

### 简介

AJAX = Asynchronous JavaScript and XML（异步的 JavaScript 和 XML）。
AJAX可以允许网页异步与服务器进行数据交换，是一个使用频率很高的技术，所以我们需要将他封装成一个简单的方法，方便调用。

而且现在主流的浏览器都支持:

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

例如设置以下代码便可以监听AJAX完成事件

``` javascript

  req.onreadystatechange = function(){
    if(req.readyState === 4)
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
  //reqData:发生的数据，为string类型 或者 formData对象
```

#### 获取服务器返回的状态和数据

AJAX一般是用来获取后台的数据，然后反馈给用户，所以我们需要获取数据。

在AJAX执行完了后，数据和状态直接存放在XMLHttpRequest对象的 **status** 和 **responseText** 里。

>status:服务器返回的状态，一般成功为200 失败为404
>
>responseText:为返回的数据，如果为JSON，依然需要转化为JS对象

## 封装的的插件

### ajax(obj)

这个是基础方法，后面会基于这个方法扩展多个方法。

``` javascript
/*
  obj选项：
  必选： reqURL:请求地址
  可选： reqMethod:请求方法  默认:GET
        reqAsync:请求异同步 默认:异步
        reqData:请求数据    默认:空
        reqHeader:请求头    默认为空   传入JS对象即可
				reqUserName:请求用户名	默认为空
				reqUserPassWord:请求密码	默认为空
        reqSuccess(data):请求成功时间函数   传入返回的数据
        reqError(data):请求失败时的响应函数
        reqBefore:发送请求前的函数
				reqProgress:请求获取的进度
				reqUploadProgress:请求发出的进度
*/
function ajax(obj){
	var reqURL = obj.reqURL;
	var reqMethod = obj.reqMethod||"get";
	var reqAsync = (obj.reqAsync===undefined?true:obj.reqAsync);
	var reqData = obj.reqData||"";//直接传数据不解析
	var reqHeader = obj.reqHeader;
	var reqUserName = obj.reqUserName||"";
	var reqUserPassWord = obj.reqUserPassWord||"";

	var reqSuccess = obj.reqSuccess;
	var reqError = obj.reqError;
	var reqBefore = obj.reqBefore;
	var reqProgress = obj.reqProgress;
	var reqUploadProgress = obj.reqUploadProgress;

	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(req.readyState === 4)
		{
			if(parseInt(req.status / 100) <= 2){//200请求系列都是成功
				if(reqSuccess && typeof reqSuccess === 'function')reqSuccess(req.responseText);
			}else{
				if(reqError && typeof reqError === 'function')reqError(req);
			}
		}
  };
  req.onerror = function() {
      if(reqError && typeof reqError === 'function')reqError(req);
  }
	req.onprogress=reqProgress;
	req.upload.onprogress=reqUploadProgress;

	req.open(reqMethod,reqURL,reqAsync,reqUserName,reqUserPassWord);
	if(reqHeader){
		for(var head in reqHeader){
			req.setRequestHeader(head,reqHeader[head]);
		}
	}
	if(reqBefore&&typeof reqBefore === 'function')reqBefore(req);
	req.send(reqData);
}
```

### get(url,data,success,error)

基于ajax方法的扩展

``` javascript
function get(url,data,success,error){
  var arr=[];
  for(var name in data){
    arr.push(name+"="+data[name]);
  }
  if(arr.length>0)url=url+'?'+arr.join('&');

  ajax({
    reqURL:url,
    reqSuccess:success,
    reqError:error
  });
}
```

### getJSON(url,data,success,error)

基于get方法的扩展，转化json格式

``` javascript
function getJSON(url,data,success,error){
	get(url,data,function(data){
		success(JSON.parse(data));
	},error);
}
```

### post(url,data,success,error)

基于ajax方法的扩展

``` javascript
function post(url,data,success,error){
  ajax({
    reqURL:url,
    reqMethod:'post',
    reqData:data,
    reqSuccess:success,
    reqError:error
  });
}
```

## 版本
还在修改中，在学习和开发过程中遇到问题会及时修正和更新~~

> 2017-7-18   修复无法捕捉网络错误的问题，将100和200系列响应认为默认为正确

> 2017-2-8    修复GET函数多个?的缺陷，增加请求进度的控制

> 2017-1-13   修复BUG，post请求请求名错误

> 2016-12-22  修复BUG，异步为false时依然为true

> 2016-12-19  修复BUG，异步为true时依然为false

> 2016-11-21  修改、添加post

> 2016-9-27   添加用户名和密码，添加开始reqBefore前设置XMLHttpRequest对象 添加get方法

> 2016-9-16   建立
