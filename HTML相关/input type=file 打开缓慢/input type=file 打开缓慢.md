# input type=file 打开缓慢

有时会需要使用Input选择文件，但是选择框在一些情况下会很久才能打开，这篇文章将会收集我遇到这类问题，并记录解决方法

## 情况一: accept 滥用 *

有的时候会通过`accept`字段来筛选可选文档，提高用户体验，但是只是初略的使用`image/*`这样的字段，在某些浏览器(比如chrome,)会导致选择框打开缓慢的问题,所以尽量将文件类型限制描述完全

<input type="file" accept="image/*">image/*</input>

<input type="file" accept="image/png, image/jpg">image/png, image/jpg</input>
``` html
<input type="file" accept="image/*">image/*</input>

<input type="file" accept="image/png, image/jpg">image/png, image/jpg</input>
```

## END

>   2017-10-24   完成文章，添加了一个情况

>   2017-9-14   立项
