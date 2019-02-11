# MongoDB备份和恢复

简单讲述MongoDB备份和恢复的方法。

## 备份

备份主要使用的 `mongodump` 指令

这里简单的讲述主要的用法（备份整个数据库）

>   mongodump -h dbhost -d dbname -o dbdirectory

1.  -h dbhost

    MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017

2.  -d dbname

    数据库的名字

3.  -o dbdirectory

    备份的数据存放位置，例如：`c:\dbdata`，该目录需要提前建立，在备份完成后，系统自动在dump目录下建立一个和数据库名相同的目录，这个目录里面存放该数据库实例的备份数据。

![](http://blog-cdn.chenxiyuan.fun/17-5-31/21997800.jpg)

比如我执行

>   mongodump -h 127.0.0.1 -d my-blog -o F:\dbdata

就将我的数据备份出来了

![](http://blog-cdn.chenxiyuan.fun/17-5-31/77252295.jpg)

## 恢复

恢复主要使用的 `mongorestore` 指令

主要的用法是这样的

>   mongorestore -h dbhost -d dbname dbdirectory

1.  -h dbhost

    MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017

2.  -d dbname

    需要恢复的数据库实例,就是将数据恢复到哪去

3.  dbdirectory

    备份数据的所在位置，与上面的北方对应的就是 `F:\dbdata\my-blog`

比如我执行

>   mongorestore -h 127.0.01 -d test F:\data\my-blog

就会将数据加载到 `test` 这个数据库中

![](http://blog-cdn.chenxiyuan.fun/17-5-31/24955988.jpg)

我们就可以看到我的数据加载了进来

### 注意

1.  恢复重复操作只会添加和修改ID对应的数据，不会删除没有了的，如果需要的话需要加上 `–drop`

2.  恢复的时候在windows下，中文名词的路径可能存在问题

## END

>   2017-5-31   完成

>   2017-5-31   立项
