# git本地打tag

每次打TAG都要跑去远程仓库很麻烦，如果可以本地打就好了，这篇文章讲述如何使用git命令本地打TAG

## 准备

在这之前先在线上git仓库创建一个工程，然后clone下来，并进行一次提交

![](http://blog-cdn.chenxiyuan.fun/2019-2-9/a6e40cc4-2d8d-4e65-97d9-8d9eb0f5447d.png)

## 查看和设置TAG

首先中使用`git tag -l`查看已有的TAG，当然一个空工程刚开始是没有的，这里我们使用`git tag <tagname>`来设置一个叫`test`的TAG，设置后再次查看就可以看到设置的TAG了~~

![](http://blog-cdn.chenxiyuan.fun/2019-2-9/b2ce2e5b-6849-4c37-be37-4fafb0664539.png)

## 删除TAG

如果想要删除本地的一些TAG，可使用`git tag -d <tagname>`的方式来删除

![](http://blog-cdn.chenxiyuan.fun/2019-2-9/5fbd0e1a-b2a1-4218-b0e7-2f5032f21d57.png)

## 推送TAG

在本地设置好以后，有些时候会想把它推送到线上，比如版本号之类的，这里可以使用`git push <remote> <tagname>`的方式来推送

![](http://blog-cdn.chenxiyuan.fun/2019-2-9/fb2ca252-d5e4-4bb7-aa1a-a94a8e2066c8.png)

推送后，就可以在线上看到了

![](http://blog-cdn.chenxiyuan.fun/2019-2-9/a0127bb0-9fb1-4315-81f2-abe751c33584.png)

## TAG附加信息

TAG一般还会附加上备注信息，只需要加上`-m <msg>`就行，也就是`git tag <tagname> -m <msg>`

![](http://blog-cdn.chenxiyuan.fun/2019-2-9/63fffe28-7b7c-46ef-9988-0f09df61a08d.png)

![](http://blog-cdn.chenxiyuan.fun/2019-2-9/98fd17c2-a842-4c1f-b5e9-77b12df17649.png)

## 参考资料

[git tag 命令官方文档](https://git-scm.com/docs/git-tag)

## END

>   2019-02-09  完成
> 
>   2019-02-08  立项