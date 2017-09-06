# Input type=file 限制选择的文件格式

文章简单讲述 Input 标签在 type=file 的情况下通过 accept 限制选择文件的类型和后缀的方法，以及提供一个简单的类型校验函数

## 利用 accept 属性限制

`accept` 属性可以控制选择文件时的默认筛选条件，比如下面的代码

``` html

<input type="file" accept=".pdf">

```

点击这下面的选择文件，你会看到这样的页面

.pdf <input type="file" accept=".pdf">

![](http://o7yupdhjc.bkt.clouddn.com/17-9-6/31921828.jpg)

这时可选择的文件就都是后缀为 `.pdf` 的了

除了通过 `.***` 的形式设置外还可以通过设置 `MIME` 类型

``` html

<input type="file" accept="application/*">

```

application/* <input type="file" accept="application/*">

这样就可以选择所有 `application` 类型的文件了，当然也可以指定特定的类型

## 指定多个类型

多个类型可以通过 `,` 号分割，比如

``` html

<input type="file" accept=".pdf,.docx">

```

.pdf,.docx <input type="file" accept=".pdf,.docx">

## 依然要限制

然鹅，上面的图你会看到可以切换全部文件类型，然后用户就开始乱选了(一般测试才会这样去- -)，这时候依然需要对其进行检测,下面提供我根据和 `accept` 相同的值来检测加载的文件是否符合需求

``` javascript

function checkFileType(file, accept){
    let acceptArr = accept.split(',').map(a => a.trim())
    let name = file.name
    let type = file.type


    if(acceptArr.length === 0) 
        return true

    return acceptArr.some(function(accept){
        if(accept === '*'){//全部
            return true
        }

        if(/^\..+$/.test(accept)){ //文件后缀名
            let reg = new RegExp(`.+\\${accept}$`)
            return reg.test(name)
        }

        if(/^.+\/\*/.test(accept)){ //文件MIME部分
            accept = accept.replace('*','')
            let reg = new RegExp(`^${accept}.+`)
            return reg.test(type)
        }

        if(accept === name || accept === type){
            return true
        }

        return false
    })
}

```

之于为嘛有后缀和MIME两种方式，可以查看参考资料

## 参考资料

[MDN_MIME](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

## END

>   2017-9-6   完成

>   2017-9-6   立项