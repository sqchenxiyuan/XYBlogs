# ubuntu 18.04 vscode root运行配置

在开发上一直想用root权限进行开发，避免遇到一些恶心的东西，正好之前的虚拟机坏了，这次重新弄了一个root登录的ubuntu虚拟机，但是在安装vscode遇到了vscode必须设置--user-data-dir,导致syncsetting插件不能正常执行的问题，于是忙乎了一阵，差不多解决了问题，这篇文章记录一下

## 修改启动文件

通过`which`命令查看vscdoe的`code`命令在哪里
>   which code

可以看到输出了`/usr/bin/code`,这个地址，然后在`/usr/bin`目录使用

>   ls -al | grep code

可以看到输出了`lrwxrwxrwx  1 root root          24 11月 16 14:58 code -> /usr/share/code/bin/code`，`/usr/bin/code`软链接指向了`/usr/share/code/bin/code`

进入这个启动文件

>   vim /usr/share/code/bin/code

就可以看到下面的内容了

![](https://blog-cdn.chenxiyuan.fun/18-11-16/85160796.jpg)

第一段就是在判断root权限下，需要输入`--user-data-dir`才能继续正常运行

![](https://blog-cdn.chenxiyuan.fun/18-11-16/7429030.jpg)

这里把这段屏蔽掉，让他不判断，因为后面会添加默认的参数

![](https://blog-cdn.chenxiyuan.fun/18-11-16/67284258.jpg)

文件最后可以看出是在传递参数，这里在最后加伤我们的参数就可以了～～～

![](https://blog-cdn.chenxiyuan.fun/18-11-16/62538589.jpg)

图片里的路径可以自己设置哦，到现在在命令行里面调用`code`命令已经可以正常使用了

## 修改桌面快捷方式

除了命令行以外，还需要修改桌面图标的内容，因为桌面图标的启动路径不在`/usr/share/code/bin/code`而是直接指向`/usr/share/code/code`运行文件，所以我们只需要修改一下指向就行了

修改`/usr/share/applications/code.desktop`和`/usr/share/applications/code-url-handler.desktop`文件中的`Exec`属性的路径就行了

![](https://blog-cdn.chenxiyuan.fun/18-11-16/62622068.jpg)

![](https://blog-cdn.chenxiyuan.fun/18-11-16/86494183.jpg)

这样就可以在root身份下愉快的和vscode玩耍啦～～～

## END

>   2018-11-16  完成
> 
>   2018-11-16  立项