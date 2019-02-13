# git设置提交时间

为了保证github的小绿点，每天都要写代码提交一波，但是有的时候确实有事啊，或者写了代码忘了提交，就会丢掉好不容易积累起来的小绿点，这篇文章简单介绍一下如何设置git提交记录的提交时间，git提交设定时间再也不怕小绿点没了~~~！

## git commit --date <date>

设置是时间的方式就是`commit`命令使用`date`属性来设置，例如下面的命令，可以看到提交历史里面，时间是设定的时间

![](http://blog-cdn.chenxiyuan.fun/2019-2-13/15f75d68-0cf5-482c-9705-3128263bc101.png)

## 获取时间戳

git支持的时间戳格式有3种，可以在[git 提交日期格式规范](https://git-scm.com/docs/git-commit#_date_formats)里面找到，其中最简单的就是`2005-04-07T22:13:13`这样的格式，下面可以看到我们将日期设置到了2020年也是可以的~~~！

![](http://blog-cdn.chenxiyuan.fun/2019-2-13/15e0364b-7187-47e2-9e62-788928d72da2.png)

PS:时间是不能低于上次提交的时间的，不然就会无效

## 参考资料

[git commit 官方手册](https://git-scm.com/docs/git-commit)

[git 提交日期格式规范](https://git-scm.com/docs/git-commit#_date_formats)


[git 修改上次git commit的时间](https://blog.csdn.net/guoyajie1990/article/details/73824732)



## END

>   2019-02-13  完成
> 
>   2019-01-06  立项