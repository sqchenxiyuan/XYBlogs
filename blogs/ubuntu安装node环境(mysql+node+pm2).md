# ubuntu安装node环境(mysql+node+pm2)
---
## 数据库安装(MySQL)
这里我们安装常见的一个数据库MySQL

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

#### 方法一：使用 _sudo service mysql restart_
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
