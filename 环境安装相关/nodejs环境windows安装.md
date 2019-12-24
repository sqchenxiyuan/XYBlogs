# nodejs环境windows下安装

这篇文章主要讲述nodejs在windows环境下的快速安装

---

从2016年接触node以来，从需要手动配置环境变量，到自动配置，node的安装流程越来越简单，同时发展出了可以快速切换系统node版本的工具`nvm`，在这里当然不会讲如何手动安装，手动配置node~~~

## 安装NVM

首先前往[nvm-window的开源仓库下载](https://github.com/coreybutler/nvm-windows/releases)下载最新版的windos-nvm包

![](https://blog-cdn.chenxiyuan.fun/18-1-21/19755404.jpg)

可以下载免安装版也可以下载安装版(PS：感觉就是是不是自动帮你绑定nvm的环境变量)

下载后运行，next -> accept -> next我们就到了选择nvm安装路径的界面

![](https://blog-cdn.chenxiyuan.fun/18-1-21/79971862.jpg)

再next就到了选择node安装路径的界面

![](https://blog-cdn.chenxiyuan.fun/18-1-21/43704049.jpg)

之后就可以使用nvm啦

![](https://blog-cdn.chenxiyuan.fun/18-1-21/67551233.jpg)

## 配置NVM

使用默认的NVM环境在国内下载很慢，慢的伤心，所以需要修改配置，这里使用国内的淘宝源

前往nvm的安装目录会有一个setting文件

![](https://blog-cdn.chenxiyuan.fun/18-1-21/32117610.jpg)

修改其中的`node_mirror`为`http://npm.taobao.org/mirrors/node/`，`npm_mirror`为`https://npm.taobao.org/mirrors/npm/`

![](https://blog-cdn.chenxiyuan.fun/18-1-21/28234260.jpg)

改成这样后就可以去快速的安装node啦~~

## 安装node

使用命令安装9.4.0的node：

    > nvm install 9.4.0

![](https://blog-cdn.chenxiyuan.fun/18-1-21/21357568.jpg)

然后使用命令使用9.4.0的node

    > nvm use 9.4.0

![](https://blog-cdn.chenxiyuan.fun/18-1-21/10968544.jpg)

于是就安完了~~

## END

>   2017-1-21    完成

>   2017-1-21    立项