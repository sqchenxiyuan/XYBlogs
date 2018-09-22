# node开发包集合

这篇文章将集合我在使用node开发一些特别功能时，所找到的简单易用，功能强大的包，用来和大家分享。

## 网络解析相关

### FROM表单

####  multer

npm : [https://www.npmjs.org/package/multer](https://www.npmjs.org/package/multer)

repository : [https://github.com/expressjs/multer](https://github.com/expressjs/multer)

推荐理由：

>   一个集合express的 multipart/form-data的解析功能，当然，最强大的还是它的文件解析功能~~用了都说好！

## 文件相关

### 压缩与解压

####  archiver

npm : [https://www.npmjs.org/package/archiver](https://www.npmjs.org/package/archiver)

repository : [https://github.com/archiverjs/node-archiver](https://github.com/archiverjs/node-archiver)

推荐理由：

>   尝试了多个node端的压缩工具，(不要给我说 `cmd` 才是王)，这个包封装的更高，使用方便，解决了 `tar` 莫名其妙的路径问题，简单易用~~~

####  unzip

npm : [https://www.npmjs.org/package/unzip](https://www.npmjs.org/package/unzip)

repository : [https://github.com/EvanOxfeld/node-unzip](https://github.com/EvanOxfeld/node-unzip)

推荐理由：

>   archiver 提供了方便的压缩功能，当然需要一个方便的解压包啦~~，对于ZIP文件这个包提供了直接解压文件到文件目录的功能

## 计算相关

### 大数计算

#### bignumber.js

npm : [https://www.npmjs.com/package/bignumber.js](https://www.npmjs.com/package/bignumber.js)

repository : [https://www.npmjs.com/package/bignumber.js](https://www.npmjs.com/package/bignumber.js)

推荐理由：

>   bignumber.js 实现了大数计算的相关底层算法，方便快捷，并且活跃，big-number 已经2年没有更新了

## 解析操作相关

### HTML字符串解析操作

#### jsdom

npm : [https://www.npmjs.com/package/jsdom](https://www.npmjs.com/package/jsdom)

repository: [https://github.com/jsdom/jsdom](https://github.com/jsdom/jsdom)

推荐理由：

>   jsdom 可以在node端解析DOM并给你和在浏览器相同的体验

## END

>   2018-09-22    添加 jsdom 用于node端HTML解析和对象操作
> 
>   2017-12-19    添加 bignumber.js 用于大数计算

>   2017-8-11    添加 multer 和 unzip

>   2017-8-8    添加 压缩文件包  archiver

>   2017-8-7    立项