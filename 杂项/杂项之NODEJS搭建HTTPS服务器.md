# 杂项之NODEJS搭建HTTPS服务器

HTTPS是加密后的HTTP通道，它被广泛用于万维网上安全敏感的通讯，这里通过学习我总结一下用NODEJS搭建HTTPS服务器的过程。

---

## HTTP和HTTPS简介

### HTTP

超文本传输协议（HyperText Transfer Protocol)是互联网上应用最为广泛的一种网络协议。所有的WWW文件都必须遵守这个标准。设计HTTP最初的目的是为了提供一种发布和接收HTML页面的方法。1960年美国人Ted Nelson构思了一种通过计算机处理文本信息的方法，并称之为超文本（hypertext）,这成为了HTTP超文本传输协议标准架构的发展根基。

### HTTPS

HTTPS（Hyper Text Transfer Protocol over Secure Socket Layer），是以安全为目标的HTTP通道，简单讲是HTTP的安全版。即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。 它是一个URI scheme（抽象标识符体系），句法类同http:体系。用于安全的HTTP数据传输。https:URL表明它使用了HTTP，但HTTPS存在不同于HTTP的默认端口及一个加密/身份验证层（在HTTP与TCP之间）。这个系统的最初研发由网景公司(Netscape)进行，并内置于其浏览器Netscape Navigator中，提供了身份验证与加密通讯方法。现在它被广泛用于万维网上安全敏感的通讯，例如交易支付方面。

### 区别

>https协议需要到ca申请安全证书，一般免费证书很少，大多需要交费。
>
>http传输的信息是明文传输，https 则是具安全性的ssl加密传输协议。
>
>http和https使用的是完全不同的连接方式，用的端口也不一样，前者是默认为80，后者是默认为443。
>
>http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

##　证书

既然需要搭建HTTPS服务器，那么我们首先就需要CA证书。

### 获取认证的证书

有一些网站可以申请购买CA证书

比如：

[沃通(WoSign)](https://www.wosign.com/)

[godady](https://sg.godaddy.com/zh/)

[PositiveSSL](https://www.positivessl.com/)

[rapidssl](https://www.rapidssl.com/) 免费

[Let's Encrypt](https://letsencrypt.org/) 免费

[startssl](https://www.startssl.com/) 免费

[腾讯云](https://console.qcloud.com/ssl) 用户免费

[阿里云](https://www.aliyun.com/product/cas) 有免费版

### 自己生成证书

这里我就不去申请证书了，我们可以使用openssl，自己生成一个证书

ー(￣～￣)ξ 只是别人不认罢了。

#### 安装openssl

**openssl** window安装很麻烦，我们可以选择安装git客户端，git会顺带帮我们安装上**openssl**。

我们只需要去[git官网](https://git-scm.com/)下载git安装包就可以了

![](http://blog-cdn.chenxiyuan.fun/16-11-5/96561972.jpg)

安装时在PATH选项中选择第3个选项，不然openssl不能直接使用

![](http://blog-cdn.chenxiyuan.fun/16-11-5/93808994.jpg)

![](http://blog-cdn.chenxiyuan.fun/16-11-5/69015890.jpg)

安装完成后我们输入以下指令查看是否安装成功

>git --version  //查看git安装是否成功
>
>openssl version -a  //查看openssl安装是否成功

![](http://blog-cdn.chenxiyuan.fun/16-11-5/446083.jpg)

出现上图的效则表示成功了。

#### 生成证书

主要通过一下3条命令来生成需要的证书文件和KEY。

``` shell

//生成私钥key文件
openssl genrsa 1024 > privateKey.pem

//通过私钥文件生成CSR证书签名
openssl req -new -key privateKey.pem -out csr.pem

//通过私钥文件和CSR证书签名生成证书文件
openssl x509 -req -days 365 -in csr.pem -signkey privateKey.pem -out certificate.crt

```
执行时根据提示输入相应信息即可。

![](http://blog-cdn.chenxiyuan.fun/16-11-5/55459594.jpg)

执行完后会生成3个文件:

>privateKey.pem //私钥
>
>csr.pem        //CSR证书签名
>
>certificate.crt  //证书文件

## 服务器

下面我们直接搭建我们自己的DEMO服务器

创建package.json，安装一些必要的依赖库

``` json
{
	"name":"杂项之NODEJS搭建HTTPS服务器DEMO",
	"version":"1.0.0",
	"dependencies":{
		"express":"4.14.0"
	}
}
```

然后书写我们的服务器代码 server.js

``` javascript
var express=require('express'),
    fs=require('fs'),
    http=require('http'),
    https=require('https');

var privateKey  = fs.readFileSync(__dirname+'/ssl/privateKey.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/ssl/certificate.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var app=express();

app.get('/',function(req,res,next){
  if(req.protocol === 'https') {
      res.status(200).send('HTTPS!');
  }
  else {
      res.status(200).send('HTTP!');
  }
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000,function(){
	console.log(' - listening on http://*:'+3000);
});

httpsServer.listen(3001,function(){
	console.log(' - listening on http://*:'+3001);
});
```

再将生成的3个文件放入DEMO目录的ssl文件夹中。

### 目录结构

+ demo/
  + node_modules/
  + ssl/
    + privateKey.pem
    + csr.pem
    + certificate.crt
  + package.json
  + server.js

### 代码运行

在项目目录下执行

> node sever.js

![](http://blog-cdn.chenxiyuan.fun/16-11-5/93424173.jpg)

### 访问HTTP

访问 **127.0.0.1:3000**

![](http://blog-cdn.chenxiyuan.fun/16-11-5/15478502.jpg)

### 访问HTTPS

访问 **127.0.0.1:3001**

![](http://blog-cdn.chenxiyuan.fun/16-11-5/19121590.jpg)

注意！这是因为你没有加https的协议头，默认为http，所以服务器获取不了请求

访问 **https://127.0.0.1:3001**

![](http://blog-cdn.chenxiyuan.fun/16-11-5/87542337.jpg)

一般浏览器是会对非认证了的私密连接提醒警告的，这只需要继续就可以

![](http://blog-cdn.chenxiyuan.fun/16-11-5/21711164.jpg)

这样我们就搭建了一个HTTPS服务器~~~~！

如果希望自己的网站有HTTPS，那么最好使用第三方提供的认证证书，毕竟自己的HTTPS证书，一般不会被信任，会影响体验。

## END

> 2016-11-5 完成
