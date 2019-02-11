# chrome: Not allowed to load local resource 解决方法

chrome 浏览器由于会对本地文件的读取权限做限制，导致提示 Not allowed to load local resource 错误

## 解决方案

### windows

在chrome的属性的目标中添加：

>   --allow-file-access-from-files

![](http://blog-cdn.chenxiyuan.fun/17-9-3/81300218.jpg)

## 参考资料

http://www.chrome-allow-file-access-from-file.com/windows.html

## END

>   2017-9-3    完成

>   2017-9-2    立项