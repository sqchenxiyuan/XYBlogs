# 编程题 leetcode 18 4sum

leetcode 18 4sum 解析

## 题目

Given an array `nums` of n integers and an integer `target`, are there elements a, b, c, and d in `nums` such that a + b + c + d = `target`? Find all unique quadruplets in the array which gives the sum of `target`.

Examples:

```
Given array nums = [1, 0, -1, 0, -2, 2], and target = 0.

A solution set is:
[
  [-1,  0, 0, 1],
  [-2, -1, 1, 2],
  [-2,  0, 0, 2]
]
```
----

3sum的进阶版

## 解题思路

可以看做3sum的问题的变种

## AC代码

### Javascript

``` javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
let fourSum = function(nums, target) {
    nums.sort((a, b) => a - b)

    let result = []

    for (let i = 0; i < nums.length; i++){
        if (nums[i] === nums[i - 1]) continue
        
        let sumtarget = target - nums[i]

        for (let j = i + 1; j < nums.length; j++){
            if (j > i + 1 && nums[j] === nums[j - 1]) continue

            let sumtarget2 = sumtarget - nums[j]
            let p = j + 1, q = nums.length - 1
            while (p < q){
                if (nums[p] + nums[q] > sumtarget2){
                    q--
                    while (nums[q] === nums[q + 1]) q--
                } else if (nums[p] + nums[q] < sumtarget2){
                    p++
                    while (nums[p] === nums[p - 1]) p++
                } else {
                    result.push([nums[i], nums[j], nums[p], nums[q]])
                    p++
                    while (nums[p] === nums[p - 1]) p++
                }
            }
        }
    }

    return result
}
```
## 在线链接

[4sum](https://leetcode.com/problems/4sum)

## END

>   2018-07-12  完成

>   2018-07-12  立项
