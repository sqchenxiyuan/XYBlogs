# CSS boder-image 图片边框属性详解

最近使用boder-image来实现了一个看起来可能也许好看的边框，中间对boder-image的了解很少，查到了很久才明白了一些，这篇文章将讲述boder-image的使用以及我遇到的一些问题。

## 最简单的应用

``` html

<style media="screen">
    div{
        width: 100px;
        height: 100px;
    }

    .borderImage{
        border-image-source: url("border1.png");
        border-image-slice: 20;
    }
</style>
<div class="borderImage"></div>

```

![](http://o7yupdhjc.bkt.clouddn.com/17-6-5/47483821.jpg)

要使用图片做边框背景我们至少需要`border-image-source` 以及 `border-image-slice`。

### border-image-source

这个属性代表的图片，这里可以使用 `url` 来引入图片，当然也可以使用CSS的渐变属性，比如 `linear-gradient`

``` html

<style media="screen">
    div{
        width: 100px;
        height: 100px;
    }

    .borderImage{
        border-image-source: linear-gradient(red, blue);
        border-image-slice: 20;
    }
</style>
<div class="borderImage"></div>

```

![](http://o7yupdhjc.bkt.clouddn.com/17-6-5/50940272.jpg)

这样我们就实现了一个简单的渐变色边框

## 参考资料

[MDN border-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image)

边框图片

![](http://o7yupdhjc.bkt.clouddn.com/17-6-5/38993513.jpg)

## END

>   2017-6-1    立项
