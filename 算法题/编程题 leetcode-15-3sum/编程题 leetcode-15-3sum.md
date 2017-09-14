# 编程题 leetcode 15 3sum

leetcode 15 3sum 解析

## 难度 4/10

## 题目

Given an array S of n integers, are there elements a, b, c in S such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Examples:

```

For example, given array S = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]

```

----

这是leetcode第一题的进阶版，就是找出数组当中的所以3个数相加为0的组合

## 解题思路

直接暴力枚举当然是直接抛弃的，这里可以先将数组进行排序，排好序后，这样数字的顺序是知道的

算法开始从第一个向后遍历，然后我们就只需要从他后面的数组中找到2个的和是当前的数的相反数的组合就行啦~~，其实就是leetcode第一题的解法了,但直接使用以前的解法可能导致超时

通过比对数字结果与目标的数字，可以判断是需要减小还是放大，由于数组进行了排序，所以可以快速的知道接下来需要组合的数字是哪个

## AC代码

### Javascript

``` javascript

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a,b) => a - b)
    let out = []

    for(let i = 0; i < nums.length; i++){
        let target = -nums[i]
        let start = i + 1
        let end = nums.length - 1
        while(start < end){
            let sum = nums[start] + nums[end]
            if(sum > target){
                end--
            }else if(sum < target){
                start++
            }else {
                out.push([nums[i], nums[start], nums[end]])
                end--
                while(nums[end] === nums[end+1]){
                    end--
                }
                while(nums[start] === nums[start-1]){
                    start++
                }
            }
        }
        while(nums[i+1] === nums[i]){
            i++
        }
    }

    return out
};

```
## 在线链接

[leetcode 15 3sum](https://leetcode.com/problems/3sum/)

## END

>   2017-9-14    完成

>   2017-9-12    立项
