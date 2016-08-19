# ubuntu安装node环境(mysql+node+pm2)

这篇文章主要是用来讲解在ubuntu上配置node服务器的环境的一些步骤(无脑跟着走就能完成)

---
## MySQL环境安装

### 1、更新软件包列表
终端窗口输入

> sudo apt-get update

来同步软件包列表

![](http://o7yupdhjc.bkt.clouddn.com/16-8-18/73652538.jpg)

### 2、安装MySQL客户端和服务端
终端窗口输入

> sudo apt-get install mysql-server mysql-client

安装MySQL客户端和服务端

![](http://o7yupdhjc.bkt.clouddn.com/16-8-18/54752372.jpg)

执行后回提示(Y/N),输入Y继续安装

![](http://o7yupdhjc.bkt.clouddn.com/16-8-18/49650396.jpg)

安装时会提示你输入MySQL初始密码,之后会再次提示输入root密码

![](http://o7yupdhjc.bkt.clouddn.com/16-8-18/70074088.jpg)

等待安装完成

![](http://o7yupdhjc.bkt.clouddn.com/16-8-18/11001437.jpg)

### 3、确认MySQL是否成功安装

#### 方法一：使用 sudo service mysql restart

终端窗口输入

> sudo service mysql restart

![](http://o7yupdhjc.bkt.clouddn.com/16-8-18/18301339.jpg)

如果mysql启动成功，处于运行状态说明mysql安装成功

#### 方法二：登录MySQL

终端窗口输入

> mysql -u root -p

![](http://o7yupdhjc.bkt.clouddn.com/16-8-18/62753993.jpg)

有提示输入root密码,那么安装成功

![](http://o7yupdhjc.bkt.clouddn.com/16-8-18/31876966.jpg)

## nodejs环境安装

### 1、安装NVM

nvm可以帮助快速安装、切换、更新 node的版本,所以这里给出安装方法。

首先从github clone nvm到本地

在控制台输入(没有git文件夹可用其他文件夹,也可以用**mkdir**指令创建)

> cd ~/git

> git clone https://github.com/cnpm/nvm.git

这时候输入nvm没有任何用 可以通过在控制台运行

> source ~/git/nvm/nvm.sh

执行后在终端输入nvm可获取如下所示

![](http://o7yupdhjc.bkt.clouddn.com/16-8-19/80966454.jpg)

但是这样执行每次重新连接ubuntu都要再输入一次很麻烦，所以需要在连接加载文件中把刚才的语句加入到里面去。

这里我推荐加入到**~/.profile**中

![](http://o7yupdhjc.bkt.clouddn.com/16-8-19/63614836.jpg)

这样每次连接后都可以直接使用nvm.

### 2、安装nodejs

使用nvm安装node就很轻松了

直接在控制台输入

> nvm install 版本号

然后你会看到一个进度条，读完后(下载完后)nvm会默认将node版本设置为你下载的版本。

![](http://o7yupdhjc.bkt.clouddn.com/16-8-19/99441924.jpg)

可以看到已经安装成功了。

但是你会发现当你重新连接后，node和npm指令无法使用所以你同样需要在连接加载文件加入一个选择node版本的语句

> nvm use 版本号

![](http://o7yupdhjc.bkt.clouddn.com/16-8-19/9350234.jpg)

然后你每次连接就会看到

> Now using node v4.4.7 (npm v2.15.8)

这类的字样，好了这样我们的node就安装完成了。

## node挂载工具PM2

pm2是npm里的一个工具，能用来挂载一些程序后台运行，不然当你关闭连接后运行的程序就会关闭。

### 1、安装pm2

控制台执行命令

>npm install -g pm2

npm安装东西在国内很慢，但可以通过简单的设置 **--registry** 参数来使用国内镜像网站(**http://registry.npm.taobao.org**)来加速下载

>npm install -g pm2 --registry=http://registry.npm.taobao.org

这样就下很快了,这样的方法用来下载其他的npm包也是有效的。

### 2、使用pm2

使用pm2很简单

> pm2 start 文件名

即可

![](http://o7yupdhjc.bkt.clouddn.com/16-8-19/77475355.jpg)

这样程序就挂载了起来，不会再链接关掉后中断，而且可以帮你在发生异常停止时帮你重启程序。

我们可以再配置文件中加上

>pm2 ls

![](http://o7yupdhjc.bkt.clouddn.com/16-8-19/58465309.jpg)

这样每次连接就可以看到正在运行的程序~~

![](http://o7yupdhjc.bkt.clouddn.com/16-8-19/40257132.jpg)


这篇文章就到此为止~~
