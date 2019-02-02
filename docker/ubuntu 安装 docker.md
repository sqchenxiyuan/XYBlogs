# ubuntu 安装 docker & docker-compose

新买了个服务器，需要安装doker，之前安装docker没有记录下来，这次记录一下安装以及配置源的过程~~~~

## 安装 Docker

根据官方文档，使用源的方式进行安装时最简单和便捷的

1.  执行命令更新源

    > sudo apt-get update

2.  执行命令下载依赖

    > sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common

3.  执行命令添加docker官方GPG key

    > curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    >
    > sudo apt-key fingerprint 0EBFCD88

    ![](http://blog-cdn.chenxiyuan.fun/2019-2-2/eeb2de96-c457-4e66-8035-9c4cdfe14859.png)

4. 执行命令添加对应的源,其中的arch是系统CPU架构

    > sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

5.  执行命令再次更新源

    > sudo apt-get update

6.  执行命令安装docker

    > sudo apt-get install docker-ce docker-ce-cli containerd.io

    ![](http://blog-cdn.chenxiyuan.fun/2019-2-2/e1ce93fc-1cf8-4263-8a8d-e3a17d6a7049.png)

7. 安装完成~~~

    ![](http://blog-cdn.chenxiyuan.fun/2019-2-2/44d867bb-ec69-4225-9503-584e37a8a06b.png)

## 安装docker-compose

docker-compose也是一个很重要的命令，我们继续安装docker-compose

1.  执行命令下载`docker-compose`

    >   sudo curl -L "https://github.com/docker/compose/releases/download/1.23.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

    这里的`1.23.2`是docker-compose的版本号，可以根据情况咨询更换

2. 给下载的`docker-compose`程序赋予执行权限

    >   sudo chmod +x /usr/local/bin/docker-compose

3. 安装完成

    ![](http://blog-cdn.chenxiyuan.fun/2019-2-2/18b40a95-937d-4b54-a25e-ac040b5f88f0.png)

## 参考资料

[官方ubuntu安装文档](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

[官方docker-compose安装文档](https://docs.docker.com/compose/install/)

## END

>   2019-02-02 完成
> 
>   2019-02-02 立项