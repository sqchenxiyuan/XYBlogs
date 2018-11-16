# ubuntu nodejs使用nvm管理和安装

2年前写了一篇当时配ubuntu环境的文章，里面有关于nvm的安装，但是过了这么长时间有些变化，而且想要独立出来，所有在这篇文章在详细介绍下nvm的安装和使用

## NVM的安装

nvm可以帮助我们快速来回切换nodejs的版本，git仓库在[https://github.com/creationix/nvm](https://github.com/creationix/nvm)

在主页面READEME也有相关的安装教程，这里使用拉取git仓库的方式

1.  首先,到防止仓库的目录下，clone仓库

    >   git clone https://github.com/creationix/nvm.git

2.  进入NVM的目录

    >   cd nvm

3.  切换到最新的一个版本,写这篇文章的时候是`v0.33.11`

    >   git checkout v0.33.11

4.  将`nvm.sh`使用`source`命令执行

    >   source nvm.sh

5.  执行`nvm`

    >   nvm

这个时候就可以看到nvm指令，正常运行了，但是关闭终端再打开就不行了，所以需要在`~/.bashrc`、`~/.profile`或者`~/.zshrc`文件执行一次这个命令，需要指定绝对路径，使用`pwd`命令查看当前目录的路径，加上文件名就行了,类似下面的命令

``` shell
export NVM_DIR="path/to/nvmdir"
[ -s "$NVM_DIR/nvm.sh"] && source "$NVM_DIR/nvm.sh"
```

## NVM配置

在安装完成后，需要配置一下下载源，在国内可以使用[淘宝源](https://npm.taobao.org/mirrors/node/)

继续在配置的文件里加入对下载源的环境变量

``` shell
export NVM_DIR="path/to/nvmdir"
export NVM_NODEJS_ORG_MIRROR="https://npm.taobao.org/mirrors/node/"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"
```
这样就配置完成了

## NVM下载和使用node

nvm下载node只需要

>   nvm install <node_version>

命令就能下载了

下载完成后调用

>   nvm use <node_version>

即可～～～！

## END

>    2018-11-16  修复代码中`[ -s "$NVM_DIR/nvm.sh"]` 最后少了个空格的问题
> 
>    2018-11-07  完成
> 
>    2018-11-07  立项