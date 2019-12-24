# ubuntu 简单的iptable接口转发 解决没有root权限无法绑定80端口

Linux内核规定在没有root权限时是不能占用1024以下的端口的。

然而为了安全我们一般都不采用root权限来运行服务器，所以我们这里可以用iptable来简单的完成目的。

------

![](https://blog-cdn.chenxiyuan.fun/16-8-21/66227573.jpg)

在没有root权限的情况下，直接监听80端口会报错


我们只能去监听1020以上的端口才行，然后通过端口转发，让别人访问80端口时访问到我们规定的的端口。

##　转接方法

### 方法一：命令行

控制台输入

> sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
>
>sudo iptables-save

这条命令是将80端口转发到3000，这样就行了。
只需要将我们的服务器监听到3000端口，访问80端口就能访问到我们的服务器了，同时3000端口当然也可以使用。

### 方法二：编辑iptable规则文件

当想要方便的修改端口时，还是推荐编辑规则文件。

#### 1、导出规则

控制台输入

> sudo sh -c "iptables-save > /etc/iptables.rules"

将规则导出到 **/etc/iptables.rules** 的文件中

#### 2、编辑规则

控制台输入

> sudo vi /etc/iptables.rules

![](https://blog-cdn.chenxiyuan.fun/16-8-21/4258231.jpg)

我们可以看到其中有我们刚刚添加的规则

> -A PREROUTING -i eth0 -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 3000

这里我们可以修改或者添加其他规则。

#### 3、应用规则文件

控制台输入

> sudo iptables-restore /etc/iptables.rules

即可将编辑好的规则文件应用。

之后只要将我们的node服务器监听到转接到的端口就行了~~~
