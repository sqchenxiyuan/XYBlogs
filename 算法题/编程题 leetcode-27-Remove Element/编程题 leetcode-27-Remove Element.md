# 编程题 leetcode 27 Remove Element

leetcode 27 Remove Element 解析

## 题目

Given an array nums and a value val, remove all instances of that value in-place and return the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with O(1) extra memory.

The order of elements can be changed. It doesn't matter what you leave beyond the new length.

Example1:
```
Given nums = [3,2,2,3], val = 3,

Your function should return length = 2, with the first two elements of nums being 2.

It doesn't matter what you leave beyond the returned length.
```

Example2:
```
Given nums = [0,1,2,2,3,0,4,2], val = 2,

Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4.

Note that the order of those five elements can be arbitrary.

It doesn't matter what values are set beyond the returned length.
```

----

和上一题差不多，修改数组去处指定的数字

## 解题思路

遍历的时候标记当前位置以及新数组的长度，发现不同的就替换过去

## AC代码

### Javascript

``` javascript
let removeElement = function(nums, val) {
    let length = nums.length
    let index = 0
    for (let i = 0; i < length; i++){
        if (nums[i] !== val){
            nums[index] = nums[i]
            index++
        }
    }
    return index
}
```
## 在线链接

[remove-element](https://leetcode.com/problems/remove-element)

## END

>   2018-07-31  完成
> 
>   2018-07-31  立项