# 编程题 leetcode-4-Median of Two Sorted Arrays

leetcode 4 Median of Two Sorted Arrays解析

## 难度 1/10

## 题目

There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

Examples:

Example 1:
>   nums1 = [1, 3]

>   nums2 = [2]

>   The median is 2.0

Example 2:
>   nums1 = [1, 2]

>   nums2 = [3, 4]

>   The median is (2 + 3)/2 = 2.5

---

意思就是找到两有序数组的合并起来的中间数。

## 解题思路

也许一开始的想法都是合并后查找就可以了但是这个效率要慢一些（其实也就慢了一倍而已），只需要找打中间部分就可以了。

获取合并后的长度，计算出需要查找的中间的位置，然后我们遍历找到最终的需要两个数就可以了（奇数长度就只是两个数的位置在同一个地方而已），相加除以2就搞定了=。=

## AC代码

### Javascript

``` javascript

let findMedianSortedArrays = function(arr1, arr2) {
    let length1 = arr1.length,
        length2 = arr2.length,
        length = length1 + length2,
        a = 0,
        b = 0,
        x1, //需要加的第一个位置
        x2; //需要加的第二个位置

    arr1.push(Infinity);
    arr2.push(Infinity);

    if (length % 2 === 0){
        x1 = length / 2;
        x2 = x1 + 1;
    } else {
        x1 = Math.floor(length / 2) + 1;
        x2 = x1;
    }
    x1--;
    x2--;

    for (let i = 0; i < length && (i <= x1 || i <= x2); i++){
        let min;

        if (arr1[0] < arr2[0]){
            min = arr1.shift();
        } else {
            min = arr2.shift();
        }

        if (i === x1){
            a = min;
        }

        if (i === x2){
            b = min;
        }
    }

    return (a + b) / 2;

};

```

## 在线链接

[Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays)

## END

>   2017-4-13    完成

>   2017-4-13    立项
