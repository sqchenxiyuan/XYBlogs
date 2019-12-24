# [错误记录]JS严格模式下的报错

JS严格模式下的奇葩问题

## 经历

最近项目中PDFJS有些浏览器不能渲染了，一开始排查以为是PDFJS在webpack打包下的问题，一直没有找到解决原因，后来突然发现了是在JS严格模式下，元素的`style`属性是不可修改的！！！！

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
</head>
<body>
    <script>
        "use strict";
        var div = document.createElement("div")
        div.style = "width: 100%"
        div.innerHTML="success"
        document.body.appendChild(div)
    </script>
</body>
</html>
```

这段代码会在IE和一些老的safira浏览器报错，原因是严格模式下元素的`style`属性不能修改！！！！，需要用`element.style.xxxx = yyyy`的模式修改才行

![](https://blog-cdn.chenxiyuan.fun/2019-3-15/88efe278-eadc-4276-ac68-69afa0c6954a.png)

## ENd

>   2019-03-15 完成
> 
>   2019-03-15 立项