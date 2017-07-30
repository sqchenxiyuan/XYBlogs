# CSS 弹性盒子模型 Flex 简介

CSS 弹性盒子模型已经提出很久了，但是由于兼容相关的原因，一直没有大规模采用，随着技术的发展大量的浏览器已经可以支持 Flex 属性了，这篇文章将会简单讲述和CSS 弹性盒子模型的相关内容。

## 弹性盒子简介

个人认为，弹性布局模型就是根据所处的设备，视图大小，进行自动的宽高改变的的一个具有更强的空间可塑能力的模型。

由于现代智能设备的种类繁多，不同的设备间展示都存在一定的差距，只依靠浮动布局已经不能特别好的满足展示所需要的功能效果。

弹性盒子模型的出现便是为了解决这一痛点。当下由于低端浏览器的使用率依然很高，导致弹性布局无法大量的普及，主流的CSS布局框架依然采用的浮动布局。然而我相信弹性布局终将会成为未来的主流布局方案。

## 弹性容器相关概念

![](https://mdn.mozillademos.org/files/12998/flexbox.png)
(图片来自MDN)

**弹性容器(flex container)**

包含着弹性项目的父元素。通过设置 display 属性的值为 flex 或 inline-flex 来定义弹性容器。

**弹性项目(flex item)**

弹性容器的每个子元素都称为弹性项目。弹性容器直接包含的文本将被包覆成匿名弹性单元。

**轴(axis)

每个弹性框布局包含两个轴。弹性项目沿其依次排列的那根轴称为主轴(main axis)。垂直于主轴的那根轴称为侧轴(cross axis)。

## 弹性盒子使用方法

弹性盒子模型主要有两个东西 弹性容器（flex-container） 和 弹性项目（flex-item）。看名字都知道是什么意思了。

### 简单的实现

要让一元素成为一个弹性容器，我们需要设置它的 `display` 为 `flex`，这样才能使这个元素成为一个弹性容器，这样下面的元素才能成为弹性项目。

``` html

<style>
    .container{
        display: flex;
        height: 100%;
        width: 100%;
    }

    .item{
        flex: 1;
        text-align:center;
        font-size: 50px;
        border:1px solid red;
    }

</style>

<div class="container">
    <div class="item">1</div>
    <div class="item">2</div>
    <div class="item">3</div>
</div> 

```

![](http://o7yupdhjc.bkt.clouddn.com/17-7-30/90135246.jpg)

[DEMO1](https://jsfiddle.net/sqchenxiyuan/Leujq87y/)

这样就实现了一个最简单的弹性布局。下面我们来详细的看一下和弹性布局有关的CSS属性

### 弹性容器相关属性

弹性容器的相关属性有：`align-content`、`align-items`、`justify-content`、`flex-direction`、`flex-wrap`、`flex-flow`

这些属性主要是用于规定弹性项目的排序展示方式。

#### align-content

`align-content` 属性定义了当作为一个弹性盒子容器的属性时，浏览器如何在容器的侧轴围绕弹性盒子项目分配剩余空间。

|属性值|描述|
|---|---|
|flex-start|所有行紧靠开始点|
|flex-end|所有行紧靠结束点|
|center|所有行居中紧帖|
|space-between|行与行之间平均留空|
|space-around|行与行之间和行与四周平均留空|

可以在 [DEMO2](https://jsfiddle.net/sqchenxiyuan/5ws4bnny/) 试一试改变属性值的效果

在MDN中还描述了一些别的属性但是大部分都是没有支持的。

#### align-items

`align-items` 属性就比较容易理解了，它控制的元素在侧轴上的对齐方式。

|属性值|描述|
|---|---|
|flex-start|元素向侧轴起点对齐|
|flex-end|元素向侧轴终点对齐|
|center|元素在侧轴居中。如果元素在侧轴上的高度高于其容器，那么在两个方向上溢出距离相同。|

可以在 [DEMO3](https://jsfiddle.net/sqchenxiyuan/m5m736q0/) 试一试改变属性值的效果

#### justify-content

`justify-content` 属性与 `align-items` 属性对应。它控制的元素在主轴上的对齐方式。

|属性值|描述|
|---|---|
|flex-start|所有行紧靠开始点|
|flex-end|所有行紧靠结束点|
|center|所有行居中紧帖|
|space-between|行与行之间平均留空|
|space-around|行与行之间和行与四周平均留空|

可以在 [DEMO4](https://jsfiddle.net/sqchenxiyuan/f72uert7/) 试一试改变属性值的效果

#### flex-direction

`flex-direction` 属性是控制弹性盒子容器内弹性项目的分布方向（横向、竖向）。

|属性值|描述|
|---|---|
|row|横向排列|
|row-reverse|横向反向排列|
|column|竖向排列|
|column-reverse|竖向反向排列|

可以在 [DEMO5](https://jsfiddle.net/sqchenxiyuan/jzobwun5/) 试一试改变属性值的效果

#### flex-wrap

`flex-wrap` 属性规定flex元素是否可以多行显示。

|属性值|描述|
|---|---|
|nowrap|flex 的元素被摆放到到一行，这可能导致溢出 flex 容器|
|wrap|flex 元素被打断到多个行中。|
|wrap-reverse|和 wrap 的行为一样，但是打断后行的排列方向是反的|

可以在 [DEMO5](https://jsfiddle.net/sqchenxiyuan/jzobwun5/) 试一试改变属性值的效果

#### flex-flow

`flex-wrap` 属性是 `flex-direction` 和 `flex-flow` 的简写属性

>   syntax: <'flex-direction'> || <'flex-wrap'>

---

以上就是弹性容器的CSS属性了，主要就是对内部弹性项目的排列展示顺序的控制。

###  弹性项目相关属性

弹性项目的相关属性有：`flex-grow`、`flex-shrink`、`flex-basis`、`flex`。

它们都主要是负责控制弹性项目的大小。

#### flex-grow

`flex-grow` 这个属性控制的弹性项目的拉伸因子，当所处行存在空白的时候会根据该行的元素的拉伸因子分配多余的空间。默认值为0，即不会自动扩展。

#### flex-shrink

`flex-shrink` 这个属性与 `flex-grow` 相反是收缩因子。默认值为1，即会自动收缩。

#### flex-basis

`flex-basis` 属性指定了 flex 元素在主轴方向上的初始大小。如果不设置一般会读取 `width`;

#### flex

这个属性就是上面三个属性的集合体。

#### order

`order` 属性可以更改元素出现的顺序，即会优先根据设置的order来排序。默认为0;

---

这些属性可以在[DEMO6](https://jsfiddle.net/sqchenxiyuan/zowfuhup/)中试一试~~

## 小提示

1.  通过设置弹性项目的 `width` 和 `height` 的 `min` 和 `max`可以限制自动伸缩的极限哦~~

2.  当 `flex-warp` 设置为 `warp` 后，如果有基础宽度那么自动收缩将失效，当达到基础宽度会切换到下一行，除非只剩一个了。

## 参考资料

[MDN_Flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

[icanuse_flex](http://caniuse.com/#search=flex)

## END

>   2017-7-30   立项

>   2017-7-28   立项