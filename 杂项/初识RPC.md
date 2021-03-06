# 初识RPC

这篇文章将讲述什么是RPC（Remote Procedure Call Protocol）。ps:我才不会说是一开始弄错了，快写完了才发现

## 常用的服务请求方式

### 最原始的调用方式

平时开发一般直接采用的是调用 `ajax` 的方式来实现与服务端的通信：

``` javascript

ajax.post(path,data,options)

```

这样的请求方式每次都需要明确的请求地址，方式等等,如果直接在开发中这样写，将会使代码耦合度增加，当修改一个接口时，就会导致大量的地方需要修改（很可能修改不完全带来潜藏的BUG）

## 简单的封装

上面遇到的情况我们一般会采用将一个个API封装成对应的各个调用函数，来构建一个API层，在程序中引入对应的函数来解耦。

``` javascript

//某些地方
dosome(...)

//定义的地方
function dosome(obj){
    ajax.post(...)
}

```

这样一个接口修改大部分都只需要修改接口函数内部的内容了。比如，修改请求方式，请求地址，请求格式等等。

但是这个依然与网络请求有大量的耦合（路径，方式等等），对于开发者将会去考虑网络通信的配置将是一个繁杂的事情。

而 `RPC` 的核心就是去除对网络通信的依赖，让开发者致力于对服务的处理。

## RPC

`RPC` 全称 `Remote Procedure Call Protocol`,中文名称 `远程过程调用协议`。

它是一种通过网络从远程计算机程序上请求服务，而不需要了解底层网络技术的协议。

说白了其实就是将远程的函数调用伪装成本地调用罢了。

使用RPC，提供相应的接口，将底层的网络请求透明化。

### 结构

![](https://blog-cdn.chenxiyuan.fun/17-5-25/36991398.jpg)

客户端函数通过调用封装好的请求接口向服务端请求通信，服务端也同样通过封装好的响应接口来接受处理。

### 请求数据的结构

网络请求必然伴随着数据，但是数据必定需要有固定的格式才能相互理解。

1.  **协议版本**

    网络通讯首要的就是通讯的协议版本是相同的，这样才能让双方采用相同的请求（当然在服务端和客户端开发时可以约定固定的版本号，减少不必要的网络请求数据）

2.  **程序号**

    这个标识着需要请求的服务程序号。当然是必须的~

3.  **过程号**

    这个标识这一次请求的序号，用于区别不同的请求。

4.  **数据体**

    请求或应答的数据体

这4个是 `RPC` 所必须的内容，各种RPC协议都至少拥有这四个内容。`RPC` 协议有很多，也许有些为了解决特定需求有一定的扩充（反正都是各自定义各自的嘛-。-）

### 缺点

1.  由于构建在应用层之上，应用层协议自带的大量特性将会无法使用有点亏。

    比如，由于透明化了网络请求的方式，我们将不能直接使用 `HTTP` 等协议的特性，比如请求头，cookie等等，这些东西都将是透明化的，所以 `session` 的权限控制方法将会失效，我们需要使用 `token` 之类的东西来控制相应的网络请求权限。

2.  异常处理，由于这不是本地调用，所以可能发生的异常不仅仅只有函数运行抛出的异常，还可能是来自网络，服务框架等等地方的问题

## 总结

PRC 是一个屏蔽远程调用间的网络通讯，使调用者感觉是在调用本地函数的协议，用于解耦不同的服务到不同的服务区块。忽视服务所处的环境，将不同的服务采用适合的架构实现，抹平不同服务间运行结构上的差距，我想，这才是真正的意义。

## 后记

一开始想错了 RPC 的真正意义，快写完了才发现想错了 Sad= =、、

## END

>   2017-5-25 完成

>   2017-4-11 立项
