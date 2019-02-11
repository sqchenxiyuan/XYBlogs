# 编程题 leetcode 11 Container With Most Water

leetcode 11 Container With Most Water解析

## 题目

Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container and n is at least 2.
-----

题目大概意思就是在坐标系上给定一大堆的竖线（与X轴相连），求从中选取两个竖线和x轴能最多装多少水(其实就是构成的最大矩形面积)，大致如图

![](http://blog-cdn.chenxiyuan.fun/18-6-8/92694831.jpg)

## 解题思路

如果不考虑效率可以直接使用双重循环就可以实现，但是效率很可怜，这道题可以采用如下算法来实现O(n)的效率

1.  初始取两段的线条，计算可容纳的面积，并标记为目前的最大面积

    ![](http://blog-cdn.chenxiyuan.fun/18-6-8/58837332.jpg)

2.  然后比对两条线段，向中心更换最短的那条(比如i,j(j>i)两条线段，第i条线短，就将第i条换为第i+1条,如果是第j条，就将第j条换为第j-1)，然后计算新的面积并与之前的最大面积进行比较，如果更大则替换

    ![](http://blog-cdn.chenxiyuan.fun/18-6-8/92694831.jpg)

    ![](http://blog-cdn.chenxiyuan.fun/18-6-8/48956801.jpg)

    ![](http://blog-cdn.chenxiyuan.fun/18-6-8/56921584.jpg)

1.  重复上述操作直到j - i = 0,最后输出最大面积即可

算法的证明：

要证明算法是正确的只需要证明该算法确实在遍历过程中会经历面积最大的地方(因为算法没有完全遍历所有的可能)

首先第一条规律：如果短线在中央附近，那么必然存在比其高的线可以构成更大的面积，如图

![](http://blog-cdn.chenxiyuan.fun/18-6-8/22558225.jpg)

为此我们完全可以忽略两边线都比其长的线，这样结构就变成了这样

![](http://blog-cdn.chenxiyuan.fun/18-6-8/2736014.jpg)

然后第二条规律：边缘的最短线，在算法中计算了其可能的最大面积，因为他最大面积就是和最远的另外一边构成的面积(和其他所有线构成的面积都小于与最远端构成的面积)，如图

![](http://blog-cdn.chenxiyuan.fun/18-6-8/96943262.jpg)

根据规律二处理后，当边缘最短线计算后，记录最短线的面积，然后去除边缘最短线，再次计算新的线组当中的边缘最短线的面积，进行比较，这样循环下去，每条边就都间接比对了自己与其他边的所有可能（每一次边缘最短线的计算就是每条边与边缘最短线可能的组合的最大值，然后与过去的最大值进行比较），为此这样的算法必将经过并比较出最大的面积

![](http://blog-cdn.chenxiyuan.fun/18-6-8/72689654.jpg)

然后根据规律一，我们可以知道中间的短线是不影响最大值的所以，将短线加入算法中是没有影响的。

## AC代码

### Javascript

``` javascript
let maxArea = function(heights) {
    let i = 0
    let j = heights.length - 1
    let max = 0

    while (j - i > 0){
        max = Math.max(max, Math.min(heights[i], heights[j]) * (j - i))
        if (heights[i] > heights[j]){
            j--
        } else {
            i++
        }
    }

    return max
}
```

## 在线链接

[container-with-most-water](https://leetcode.com/problems/container-with-most-water)

## END

>   2018-06-08  完成

>   2018-06-04  立项
