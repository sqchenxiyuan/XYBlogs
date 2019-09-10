# ubuntu initramfs修复

正happy的敲着代码突然停电了T T,今天上来发现虚拟机ubuntu系统进入了initramfs,找了半天终于找到了退出办法

## 解决方法

在initramfs后面输入 fsck.ext4 -y <出错的盘符，例如/dev/sda1> 可修复一下

## END

>    2019-09-10  完成
> 
>    2019-09-10  立项