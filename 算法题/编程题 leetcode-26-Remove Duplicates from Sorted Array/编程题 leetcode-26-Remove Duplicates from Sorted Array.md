# 编程题 leetcode 26 Remove Duplicates from Sorted Array

leetcode 26 Remove Duplicates from Sorted Array 解析

## 题目

Given a sorted array nums, remove the duplicates in-place such that each element appear only once and return the new length.

Do not allocate extra space for another array, you must do this by modifying the input array in-place with `O(1)` extra memory.

Example1:
```
Given nums = [1,1,2],

Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.

It doesn't matter what you leave beyond the returned length.
```

Example2:
```
Given nums = [0,0,1,1,1,2,2,3,3,4],

Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.

It doesn't matter what values are set beyond the returned length.
```

Clarification:

Confused why the returned value is an integer but your answer is an array?

Note that the input array is passed in by reference, which means modification to the input array will be known to the caller as well.

Internally you can think of this:

----

使用O(1)的空间去重一个排序了的数组

但需要注意返回的是长度，但会截取以前的数组，所以需要修改数组

## 解题思路

已经排序好了，相当于这个数组的数值的变化次数

## AC代码

### Javascript

``` javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
let removeDuplicates = function(nums) {
    let length = nums.length
    if (length === 0) return 0

    let count = 0
    for (let i = 0; i < length; i++){
        if (nums[i] !== nums[count]){
            nums[++count] = nums[i]
        }
    }
    return count + 1
}
```
## 在线链接

[remove-duplicates-from-sorted-array](https://leetcode.com/problems/remove-duplicates-from-sorted-array)

## END

>   2018-07-30  完成
> 
>   2018-07-30  立项