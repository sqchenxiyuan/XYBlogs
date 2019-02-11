# mongodb在docker中备份与恢复

之前有文章讲述了mongodb如何进行备份与恢复，但是最近遇到了使用docker运行mongo时，导出和备份数据没有权限的问题

## 原因和解决思路

导致这样的问题的原因是mongodb默认只允许本地进行导入和导出，为此需要进入虚拟机内部导出数据后复制出来(或者挂载目录)

## 导出

首先使用`docker exec -it <容器名/ID> /bin/sh`进入docker容器内部

![](http://blog-cdn.chenxiyuan.fun/18-7-20/12292482.jpg)

使用导出命令`mongodump -d <数据库名称> -o <导出目录>`导出数据到一个目录

![](http://blog-cdn.chenxiyuan.fun/18-7-20/96834851.jpg)

然后使用`docker cp <源路径> <目标路径>`，路径可以是宿主机路径，也可以是`<容器名/ID>:<容器内路径>`表示的容器路径

![](http://blog-cdn.chenxiyuan.fun/18-7-20/97928558.jpg)

![](http://blog-cdn.chenxiyuan.fun/18-7-20/56629401.jpg)

这样就导出数据了~~

## 导入

导入数据只需要和导出数据相反即可

使用`docker cp <源路径> <目标路径>`将数据从本地复制到容器当中

![](http://blog-cdn.chenxiyuan.fun/18-7-20/27567875.jpg)

使用`docker exec -it <容器名/ID> /bin/sh`进入docker容器内部，然后使用恢复命令`mongorestore -d <数据库名称> <数据目录>`将数据恢复即可

![](http://blog-cdn.chenxiyuan.fun/18-7-20/27662039.jpg)

## END

>   2018-07-20    完成
> 
>   2018-07-20    立项
